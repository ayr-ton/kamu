import json

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from books.models import Book, Library, BookCopy


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
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)

        self.request = self.client.post('/api/copies/' + str(self.bookCopy.id) + '/return')

        self.assertEqual(self.request.status_code, 200)
        self.assertTrue(str(self.request.data).__contains__("Book returned"))

        book_copy = BookCopy.objects.get(pk=self.bookCopy.id)
        self.assertEqual(None, book_copy.user)

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
        self.request = self.client.get("/api/libraries/" + self.library.slug + "/")

        library_json = json.loads(json.dumps(self.request.data))

        self.assertEqual(self.library.name, library_json['name'])
        self.assertEqual(self.library.slug, library_json['slug'])
        self.assertEqual(1, len(library_json['books']))
        self.assertEqual(1, len(library_json['books'][0]['copies']))
        self.assertEqual(self.request.status_code, 200)


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
