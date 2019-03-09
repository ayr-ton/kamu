from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from django.db.utils import IntegrityError

from books.models import Book, BookCopy, Library


class BookTestCase(TestCase):
    def setUp(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.library2 = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")

    def test_can_create_book(self):
        self.assertEqual(self.book.author, "Author")
        self.assertEqual(self.book.title, "the title")
        self.assertEqual(self.book.subtitle, "The subtitle")

    def test_is_available_if_has_a_copy_with_no_user_on_library(self):
        self.book.bookcopy_set.create(library=self.library, user=None)
        self.book.bookcopy_set.create(library=self.library2, user=self.user)
        self.assertTrue(self.book.is_available(self.library))

    def test_is_available_if_has_at_least_one_copy_with_no_user_on_library(self):
        self.book.bookcopy_set.create(library=self.library, user=self.user)
        self.book.bookcopy_set.create(library=self.library, user=None)
        self.assertTrue(self.book.is_available(self.library))

    def test_is_not_available_if_book_has_no_copies_on_library(self):
        self.book.bookcopy_set.create(library=self.library2, user=None)
        self.assertFalse(self.book.is_available(self.library))

    def test_is_not_available_if_all_copies_on_library_have_a_user(self):
        self.book.bookcopy_set.create(library=self.library, user=self.user)
        self.assertFalse(self.book.is_available(self.library))

    def test_is_borrowed_if_user_has_a_copy_on_library(self):
        self.book.bookcopy_set.create(library=self.library, user=self.user)
        self.assertTrue(self.book.is_borrowed_by_user(self.library, self.user))

    def test_is_not_borrowed_if_user_does_not_have_a_copy_on_library(self):
        self.book.bookcopy_set.create(library=self.library, user=None)
        self.assertFalse(self.book.is_borrowed_by_user(self.library, self.user))

    def test_is_not_borrowed_if_user_has_a_copy_on_other_library(self):
        self.book.bookcopy_set.create(library=self.library2, user=self.user)
        self.assertFalse(self.book.is_borrowed_by_user(self.library, self.user))


class LibraryTestCase(TestCase):
    def test_can_create_library(self):
        self.library = Library.objects.create(name="Santiago", slug="slug")

        self.assertEqual(self.library.name, "Santiago")
        self.assertEqual(self.library.slug, "slug")

    def test_library_should_have_one_book(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())

        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)

        self.assertEqual(1, len(self.library.books.all()))

    def test_library_should_have_correct_book(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())

        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)
        self.assertEqual("Author", self.library.books.first().author)
        self.assertEqual("the title", self.library.books.first().title)
        self.assertEqual("The subtitle", self.library.books.first().subtitle)


class BookCopyTestCase(TestCase):
    def setUp(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())

        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")

    def test_can_create_book_copy(self):
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)
        self.assertEqual(self.bookCopy.book, self.book)
        self.assertEqual(self.bookCopy.library, self.library)
        self.assertEqual(self.bookCopy.user, self.user)

    def test_can_create_book_copy_without_user(self):
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library)
        self.assertEqual(self.bookCopy.book, self.book)
        self.assertEqual(self.bookCopy.library, self.library)
        self.assertEqual(self.bookCopy.user, None)
