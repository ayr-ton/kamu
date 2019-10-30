import json
import os

import httpretty
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from unittest.mock import patch

from books.models import Book, Library, BookCopy
from books.serializers import BookSerializer


class LibraryViewSet(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="Santiago", slug="scl")
        self.library2 = Library.objects.create(name="Belo Horizonte", slug="bh")
        self.book = Book.objects.create(author="Author", title="Book A", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.book.bookcopy_set.create(library=self.library)

    def test_returns_the_list_of_libraries_ordered_alphabetically(self):
        response = self.client.get("/api/libraries/")

        self.assertEqual(response.status_code, 200)

        libraries = response.data['results']
        self.assertEqual(2, response.data['count'])
        self.assertEqual(self.library2.name, libraries[0]['name'])
        self.assertEqual(self.library2.slug, libraries[0]['slug'])
        self.assertEqual(self.library.name, libraries[1]['name'])
        self.assertEqual(self.library.slug, libraries[1]['slug'])

    def test_can_retrieve_library_information_with_existing_slug(self):
        response = self.client.get("/api/libraries/" + self.library.slug + "/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.library.name, response.data['name'])
        self.assertEqual(self.library.slug, response.data['slug'])

        # Get the books
        response = self.client.get(response.data['books'])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(1, response.data['count'])
        self.assertEqual(1, len(response.data['results'][0]['copies']))

    def test_can_retrieve_books_from_library(self):
        response = self.client.get("/api/libraries/" + self.library.slug + "/books/")

        self.assertEqual(response.status_code, 200)

        response = json.loads(json.dumps(response.data))

        self.assertEqual(response['count'], 1)
        self.assertIsNone(response['next'])
        self.assertIsNone(response['previous'])
        self.assertEqual(len(response['results']), 1)

        book = response['results'][0]
        self.assertEqual(book['title'], self.book.title)
        self.assertEqual(book['author'], self.book.author)
        self.assertEqual(book['subtitle'], self.book.subtitle)

    def test_returns_404_when_fetching_books_from_an_invalid_library(self):
        response = self.client.get("/api/libraries/blablabla/books/")
        self.assertEqual(response.status_code, 404)

    def test_has_action_for_each_book(self):
        book2 = Book.objects.create(author="Author", title="Book B")
        book2.bookcopy_set.create(library=self.library, user=self.user)

        response = self.client.get("/api/libraries/" + self.library.slug + "/books/")

        response = json.loads(json.dumps(response.data))
        books = response['results']

        self.assertEqual(books[0]['action']['type'], 'BORROW')
        self.assertEqual(books[1]['action']['type'], 'RETURN')

    def test_has_url_for_each_book(self):
        response = self.client.get("/api/libraries/" + self.library.slug + "/books/")
        books = response.data['results']

        expected_url = 'http://testserver/api/libraries/' + self.library.slug + '/books/' + str(self.book.id) + '/'
        self.assertEqual(books[0]['url'], expected_url)

    def test_has_waitlist_added_date_for_each_book(self):
        date = timezone.now()
        user2 = User.objects.create(username="Marielle Franco", email="marielle@gmail.com")
        book2 = Book.objects.create(author="Author", title="Book B")
        book2.bookcopy_set.create(library=self.library, user=user2)
        book2.waitlistitem_set.create(library=self.library, user=self.user, added_date=date)

        response = self.client.get("/api/libraries/" + self.library.slug + "/books/")
        books = response.data['results']

        self.assertEqual(books[0]['waitlist_added_date'], None)
        self.assertEqual(books[1]['waitlist_added_date'], date)


class LibraryViewSetQueryParameters(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="My library", slug="myslug")

        self.base_url = "/api/libraries/" + self.library.slug + "/books/?"

        books_dict = [
            {'author': 'author a', 'title': 'book a', 'isbn': '1001'},
            {'author': 'author b', 'title': 'book b', 'isbn': '1002'},
            {'author': 'author not', 'title': 'book not', 'isbn': '2003'},
            {'author': 'author amazing', 'title': 'book amazing', 'isbn': '2004'},
        ]

        for book_dict in books_dict:
            book = Book.objects.create(**book_dict)
            BookCopy.objects.create(book=book, library=self.library)

    def get_request_result_as_json(self, url):
        request = self.client.get(url)
        return json.loads(json.dumps(request.data))["results"]

    def test_working_endpoint(self):
        self.request = self.client.get("/api/libraries/" + self.library.slug + "/books/")

        self.assertEqual(self.request.status_code, 200)

    def test_empty_search(self):
        books = self.get_request_result_as_json(self.base_url + "book_title=&book_author=")
        self.assertEqual(len(books), 4)

    def test_search_for_books_title(self):
        books = self.get_request_result_as_json(self.base_url + "book_title=invalid")
        self.assertEqual(len(books), 0)

        books = self.get_request_result_as_json(self.base_url + "book_title=book")
        self.assertEqual(len(books), 4)

        books = self.get_request_result_as_json(self.base_url + "book_title=a")
        self.assertEqual(len(books), 2)

        books = self.get_request_result_as_json(self.base_url + "book_title=not")
        self.assertEqual(len(books), 1)

        books = self.get_request_result_as_json(self.base_url + "book_title=ama")
        self.assertEqual(len(books), 1)

        books = self.get_request_result_as_json(self.base_url + "book_title=amazing")
        self.assertEqual(len(books), 1)

        books = self.get_request_result_as_json(self.base_url + "book_title=book amazing")
        self.assertEqual(len(books), 1)

    def test_search_for_books_author(self):
        books = self.get_request_result_as_json(self.base_url + "book_author=invalid")
        self.assertEqual(len(books), 0)

        books = self.get_request_result_as_json(self.base_url + "book_author=a")
        self.assertEqual(len(books), 4)

        books = self.get_request_result_as_json(self.base_url + "book_author=author a")
        self.assertEqual(len(books), 2)

        books = self.get_request_result_as_json(self.base_url + "book_author=ot")
        self.assertEqual(len(books), 1)

        books = self.get_request_result_as_json(self.base_url + "book_author=author b")
        self.assertEqual(len(books), 1)

        books = self.get_request_result_as_json(self.base_url + " book_author=author amazing ")
        self.assertEqual(len(books), 1)

    def test_search_for_books_author_or_books_title(self):
        books = self.get_request_result_as_json(self.base_url + "book_author=a&book_title=book a")
        self.assertEqual(len(books), 4)

        books = self.get_request_result_as_json(self.base_url + "book_author=author a&book_title=book a")
        self.assertEqual(len(books), 2)

        books = self.get_request_result_as_json(self.base_url + "book_author=author amazing&book_title=book a")
        self.assertEqual(len(books), 2)

        books = self.get_request_result_as_json(self.base_url + "book_author=author amazing&book_title=book amazing")
        self.assertEqual(len(books), 1)

    def test_search_for_books_isbn_returns_exact_match(self):
        books = self.get_request_result_as_json(self.base_url + "book_isbn=1001")
        self.assertEqual(len(books), 1)
        self.assertEqual(books[0]['title'], 'book a')


class BookViewSetTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle")
        self.base_url = "/api/libraries/" + self.library.slug + "/books/" + str(self.book.id)

    def test_borrow_calls_borrow_on_book_and_returns_200(self):
        with patch.object(Book, 'borrow') as mock_borrow:
            response = self.client.post(self.base_url + '/borrow/')
            self.assertEqual(200, response.status_code)
            mock_borrow.assert_called_once_with(user=self.user, library=self.library)

    def test_borrow_returns_404_when_called_with_invalid_book(self):
        response = self.client.post('/api/libraries/' + self.library.slug + '/books/123/borrow/')
        self.assertEqual(404, response.status_code)

    def test_borrow_returns_copies_and_action(self):
        self.book.bookcopy_set.create(user=None, library=self.library)
        response = self.client.post(self.base_url + '/borrow/')
        self.assertEqual(response.data['action']['type'], 'RETURN')
        self.assertEqual(response.data['copies'][0]['user']['username'], self.user.username)

    def test_borrow_returns_400_when_throws_error(self):
        with patch.object(Book, 'borrow', side_effect=ValueError('some error')):
            response = self.client.post(self.base_url + '/borrow/')
            self.assertEqual(400, response.status_code)
            self.assertEqual('some error', response.data['message'])

    def test_return_calls_return_on_book_and_returns_200(self):
        with patch.object(Book, 'returnToLibrary') as mock_return:
            response = self.client.post(self.base_url + '/return/')
            self.assertEqual(200, response.status_code)
            mock_return.assert_called_once_with(user=self.user, library=self.library)

    def test_return_returns_404_when_called_with_invalid_book(self):
        response = self.client.post('/api/libraries/' + self.library.slug + '/books/123/return/')
        self.assertEqual(404, response.status_code)

    def test_return_returns_copies_and_action(self):
        self.book.bookcopy_set.create(user=self.user, library=self.library)
        response = self.client.post(self.base_url + '/return/')
        self.assertEqual(response.data['action']['type'], 'BORROW')
        self.assertIsNone(response.data['copies'][0]['user'])

    def test_return_returns_400_when_throws_error(self):
        with patch.object(Book, 'returnToLibrary', side_effect=ValueError('some error')):
            response = self.client.post(self.base_url + '/return/')
            self.assertEqual(400, response.status_code)
            self.assertEqual('some error', response.data['message'])


class UserViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

    def test_user_should_be_able_to_see_its_own_profile(self):
        self.request = self.client.get("/api/profile")
        user_json = json.loads(json.dumps(self.request.data))

        self.assertEqual(self.user.username, user_json['user']['username'])

    def test_user_profile_includes_borrowed_books_count(self):
        library = Library.objects.create(name="Santiago", slug="slug")
        book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle")
        BookCopy.objects.create(book=book, library=library, user=self.user)

        self.request = self.client.get("/api/profile")
        user_json = json.loads(json.dumps(self.request.data))

        self.assertEqual(1, user_json['user']['borrowed_books_count'])


class UserBooksViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.book = Book.objects.create(author="Author", title="The title")
        self.book.bookcopy_set.create(library=self.library, user=self.user)

    def test_user_should_get_their_borrowed_books(self):
        availableBook = Book.objects.create(author="Author", title="Another title")
        availableBook.bookcopy_set.create(library=self.library)

        response = self.client.get("/api/profile/books")

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], self.book.title)

    def test_has_return_action_for_each_book(self):
        response = self.client.get("/api/profile/books")

        self.assertEqual(response.data['results'][0]['action']['type'], 'RETURN')

    def test_has_url_for_each_book(self):
        response = self.client.get("/api/profile/books")

        expected_url = 'http://testserver/api/libraries/' + self.library.slug + '/books/' + str(self.book.id) + '/'
        self.assertEqual(response.data['results'][0]['url'], expected_url)


class UserWaitlistViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.book = Book.objects.create(author="Author", title="The title")
        self.book.waitlistitem_set.create(library=self.library, user=self.user, added_date=timezone.now())

    def test_user_should_get_their_waitlisted_books(self):
        availableBook = Book.objects.create(author="Author", title="Another title")
        availableBook.bookcopy_set.create(library=self.library)

        response = self.client.get("/api/profile/waitlist")

        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], self.book.title)

    def test_has_url_for_each_book(self):
        response = self.client.get("/api/profile/waitlist")

        expected_url = 'http://testserver/api/libraries/' + self.library.slug + '/books/' + str(self.book.id) + '/'
        self.assertEqual(response.data['results'][0]['url'], expected_url)


class IsbnViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia", is_staff=True, is_superuser=True)
        self.user.set_password("pwd12345")
        self.user.save()
        self.client.force_login(user=self.user)

        self.url = '/admin/books/book/isbn/'

    def test_get_should_render_isbn_template(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)

        self.assertTemplateUsed(response, 'isbn.html')
        self.assertTemplateUsed(response, 'admin/app_index.html')

    def test_post_should_render_isbn_form_when_input_is_not_provided(self):
        response = self.client.post(self.url)

        self.assertTemplateUsed(response, 'isbn.html')
        self.assertTemplateUsed(response, 'admin/app_index.html')
        self.assertContains(response, 'Invalid ISBN provided!')

    @httpretty.activate
    def test_post_should_show_failure_message_on_book_add_form_when_isbn_is_not_found(self):
        httpretty.register_uri(
            httpretty.GET,
            "https://www.googleapis.com/books/v1/volumes?q=isbn:9780133065268",
            body='{"kind": "books#volumes", "totalItems": 0}',
            status=200)

        response = self.client.post(self.url, data={'isbn': '9780133065268'}, follow=True)

        self.assertRedirects(response, '/admin/books/book/add/?', status_code=302, target_status_code=200)
        self.assertContains(response, 'Sorry! We could not find the book with the ISBN provided.')
        self.assertTemplateUsed(response, 'admin/change_form.html')

    @httpretty.activate
    def test_post_should_show_success_message_on_book_add_form_when_isbn_is_found(self):
        content = {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "volumeInfo": {
                        "title": "Refactoring",
                        "subtitle": "Improving the Design of Existing Code",
                        "authors": [
                            "Martin Fowler"
                        ],
                        "publisher": "Addison-Wesley",
                        "publishedDate": "2012-03-09",
                        "description": "As the application of object technology--particularly bla bla bla",
                        "pageCount": 455,
                        "imageLinks": {
                            "thumbnail": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        }
                    }
                }
            ]
        }

        httpretty.register_uri(
            httpretty.GET,
            "https://www.googleapis.com/books/v1/volumes?q=isbn:9780133065268",
            body=json.dumps(content),
            status=200)

        response = self.client.post(self.url, data={'isbn': '9780133065268'}, follow=True)

        self.assertRedirects(response, '/admin/books/book/add/?isbn=9780133065268&author=Martin+Fowler&description=As'
                                       '+the+application+of+object+technology--particularly+bla+bla+bla&image_url'
                                       '=http%3A%2F%2Fbooks.google.com%2Fbooks%2Fcontent%3Fid%3DHmrDHwgkbPsC'
                                       '%26printsec%3Dfrontcover%26img%3D1%26zoom%3D1%26edge%3Dcurl%26source'
                                       '%3Dgbs_api&number_of_pages=455&publication_date=2012-03-09&publisher=Addison'
                                       '-Wesley&subtitle=Improving+the+Design+of+Existing+Code&title=Refactoring',
                             status_code=302, target_status_code=200)
        self.assertContains(response, 'Found! Go ahead, modify book template and save.')
        self.assertTemplateUsed(response, 'admin/change_form.html')


class FrontendViewTest(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="claudia", is_staff=True, is_superuser=True)
        user.set_password("pwd12345")
        user.save()
        self.client.force_login(user=user)

    def test_should_render_frontend_template(self):
        response = self.client.get('/')

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_should_render_with_analytics_disabled_when_var_is_not_present(self):
        if 'ANALYTICS_ACCOUNT_ID' in os.environ:
            del os.environ['ANALYTICS_ACCOUNT_ID']
        response = self.client.get('/')

        self.assertNotContains(response, 'analytics.js')

    def test_should_render_with_analytics_enabled_when_var_is_present(self):
        analyticsAccountId = 'UA-12345678-1'
        os.environ['ANALYTICS_ACCOUNT_ID'] = analyticsAccountId
        response = self.client.get('/')

        self.assertContains(response, 'analytics.js')
        self.assertContains(response, analyticsAccountId)
