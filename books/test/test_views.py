import json

import httpretty
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from books.models import Book, Library, BookCopy
from waitlist.models import WaitlistItem


# VIEWS

class BookCopyBorrowViewCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

    def test_user_can_borrow_book_copy(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library)

        self.request = self.client.post('/api/copies/' + str(self.bookCopy.id) + "/borrow")

        self.assertEqual(200, self.request.status_code)
        self.assertTrue(str(self.request.data).__contains__("Book borrowed"))

        book_copy = BookCopy.objects.get(pk=self.bookCopy.id)
        self.assertEqual(self.user, book_copy.user)
        self.assertIsNotNone(book_copy.borrow_date)

    def test_shouldnt_borrow_book_copy_when_invalid_id(self):
        self.request = self.client.post('/api/copies/' + str(99) + "/borrow")
        self.assertEqual(404, self.request.status_code)


class BookCopyReturnView(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

    def test_user_can_return_book_copy(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user,
                                                borrow_date=timezone.now())

        self.request = self.client.post('/api/copies/' + str(self.bookCopy.id) + '/return')

        self.assertEqual(self.request.status_code, 200)
        self.assertTrue(str(self.request.data).__contains__("Book returned"))

        book_copy = BookCopy.objects.get(pk=self.bookCopy.id)

        self.assertEqual(None, book_copy.user)
        self.assertIsNone(book_copy.borrow_date)

    def test_shouldnt_return_book_copy_when_invalid_id(self):
        self.request = self.client.post('/api/copies/' + str(99) + "/return")
        self.assertEqual(404, self.request.status_code)


class LibraryViewSet(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library)

    def test_user_can_retrieve_library_information_with_existing_slug(self):
        """tests the following url: /api/libraries/(?P<library_slug>)/books/"""

        self.request = self.client.get("/api/libraries/" + self.library.slug + "/")

        self.assertEqual(self.request.status_code, 200)

        library_json = json.loads(json.dumps(self.request.data))

        self.assertEqual(self.library.name, library_json['name'])
        self.assertEqual(self.library.slug, library_json['slug'])

        # Get the books
        self.request = self.client.get(library_json['books'])

        self.assertEqual(self.request.status_code, 200)

        library_json = json.loads(json.dumps(self.request.data))

        self.assertEqual(1, library_json['count'])
        self.assertEqual(1, len(library_json['results'][0]['copies']))

    def test_user_can_retrieve_books_from_library(self):
        self.request = self.client.get("/api/libraries/" + self.library.slug + "/books/")

        self.assertEqual(self.request.status_code, 200)

        request_data = json.loads(json.dumps(self.request.data))

        self.assertEqual(request_data['count'], 1)
        self.assertIsNone(request_data['next'])
        self.assertIsNone(request_data['previous'])
        self.assertEqual(len(request_data['results']), 1)

        book = request_data['results'][0]

        self.assertEqual(book['title'], self.book.title)
        self.assertEqual(book['author'], self.book.author)
        self.assertEqual(book['subtitle'], self.book.subtitle)


class LibraryViewSetQueryParameters(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="My library", slug="myslug")

        self.base_url = "/api/libraries/" + self.library.slug + "/books/?"

        books_info = [("author a", "book a"), ("author b", "book b"),
                      ("author not", "book not"), ("author amazing", "book amazing")]

        books_dict = []

        for book_info in books_info:
            books_dict.append({"author": book_info[0], "title": book_info[1]})

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


class WaitlistViewSetTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="My library", slug="myslug")
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())

        self.base_url = "/api/libraries/" + self.library.slug + \
            "/books/" + str(self.book.id) + \
            "/waitlist/"

    def test_add_book_to_waitlist_should_return_201_code(self):
        response = self.client.post(self.base_url)
        self.assertEqual(response.status_code, 201)

    def test_add_book_to_waitlist_should_return_created_item(self):
        response = self.client.post(self.base_url)

        waitlist_item = response.data['waitlist_item']
        self.assertEqual(waitlist_item['user']['username'], 'claudia')
        self.assertIsNotNone(waitlist_item['added_date'])
        self.assertEqual(waitlist_item['library']['slug'], self.library.slug)
        self.assertEqual(waitlist_item['book'], self.book.id)

    def test_add_book_to_waitlist_should_create_an_waitlist_item(self):
        self.assertEqual(self.user.waitlist_items.count(), 0)
        initialCount = WaitlistItem.objects.all().count()

        response = self.client.post(self.base_url)

        finalCount = WaitlistItem.objects.all().count()
        self.assertEqual(self.user.waitlist_items.count(), 1)
        self.assertEqual(initialCount + 1, finalCount)

    def test_should_not_add_book_to_waitlist_if_there_are_copies_available(self):
        initialCount = WaitlistItem.objects.all().count()
        BookCopy.objects.create(book=self.book, library=self.library)

        response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 404)
        finalCount = WaitlistItem.objects.all().count()
        self.assertEqual(initialCount, finalCount)

    def test_should_add_book_to_waitlist_if_there_are_no_copies_available(self):
        initialCount = WaitlistItem.objects.all().count()
        BookCopy.objects.create(book=self.book, library=self.library, borrow_date=timezone.now())

        response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 201)
        finalCount = WaitlistItem.objects.all().count()
        self.assertEqual(initialCount + 1, finalCount)


class UserView(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

    def test_user_should_be_able_to_see_its_own_profile(self):
        self.request = self.client.get("/api/profile")
        user_json = json.loads(json.dumps(self.request.data))

        self.assertEqual(self.user.username, user_json['user']['username'])

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
