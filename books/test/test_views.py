import json

from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone

from books.models import Book, Library, BookCopy


# VIEWS

class BookCopyAutocompleteView(TestCase):
    def setUp(self):
        self.client = Client()
        self.endpoint = reverse('book-autocomplete')

    def test_endpoint_working(self):
        """Tests if the endpoint book-autocomplete/ is working"""
        response = self.client.get(self.endpoint)

        self.assertEqual(200, response.status_code)

    def test_user_not_logged_in(self):
        """Tests if request that has no user logged in returns nothing"""
        response = self.client.get(self.endpoint)

        response = json.loads(response.content)

        # Asserts that no result is returned
        self.assertTrue(len(response.get('results')) == 0)
        self.assertFalse(response.get('pagination').get('more'))

    def test_user_logged_in_receives_result(self):
        """Tests if a user can receive results when logged in"""

        # creates and logs user
        self.user = User.objects.create_user(username="user")
        self.user.set_password("user")
        self.user.save()
        self.client.force_login(user=self.user)

        # saves a library
        self.library = Library.objects.create(name="Santiago", slug="slug")

        # saves a new book
        title = "the title of my new super book"
        self.book = Book.objects.create(author="Author", title=title, subtitle="The subtitle",
                                        publication_date=timezone.now())

        # creates a book copy
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library)

        response = self.client.get(self.endpoint)

        self.assertContains(response, title)


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
        """tests the following url: /api/libraries/(?P<slug>)/books/"""

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
        print("\n\n\n\n\n\n\n>>>>>")
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
