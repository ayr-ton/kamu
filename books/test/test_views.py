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

    def test_borrow_book_copy(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.bookCopy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)

        self.request = self.client.post('/api/copies/' + str(self.bookCopy.id) + "/borrow")
        self.assertEqual(self.request.status_code, 200)
