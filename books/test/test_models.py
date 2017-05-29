from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from books.models import Book, BookCopy, Library


# MODELS
class BookTestCase(TestCase):
    def test_book_creation(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.assertEqual(self.book.author, "Author")
        self.assertEqual(self.book.title, "the title")
        self.assertEqual(self.book.subtitle, "The subtitle")

    def test_book_type_data(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.assertIsInstance(self.book.author, str)
        self.assertIsInstance(self.book.title, str)
        self.assertIsInstance(self.book.subtitle, str)


class LibraryTestCase(TestCase):
    def test_library_creation(self):
        self.library = Library.objects.create(name="Santiago", slug="slug")

        self.assertEqual(self.library.name, "Santiago")
        self.assertEqual(self.library.slug, "slug")

    def test_verbose_name_plural(self):
        self.assertEqual(str(Library._meta.verbose_name_plural), "libraries")

    def test_library_should_have_one_book(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())

        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)

        self.assertEqual(1, len(self.library.books.all()))


class BookCopyTestCase(TestCase):
    def setUp(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())

        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")

    def test_book_copy_creation(self):
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)
        self.assertEqual(self.bookCopy.book, self.book)
        self.assertEqual(self.bookCopy.library, self.library)

    def test_verbose_name_plural(self):
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)
        self.assertEquals(str(BookCopy._meta.verbose_name_plural), "Book copies")
