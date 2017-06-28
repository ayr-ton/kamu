import datetime

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from books.models import Book, Library, BookCopy

from books.cron.send_notification import *

class SendNotifications(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("isabel")
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")

        self.bookCopies = {}
        book = BookCopy.objects.create(book=self.book, library=self.library, user=self.user,
                                                       borrow_date=datetime.date(2017, 3, 1))
        self.bookCopies[book.id] = book

        book = BookCopy.objects.create(book=self.book, library=self.library, user=self.user,
                                       borrow_date=datetime.date(2017, 1, 1))
        self.bookCopies[book.id] = book

        book = BookCopy.objects.create(book=self.book, library=self.library, user=self.user,
                                       borrow_date=datetime.date(2017, 6, 1))
        self.bookCopies[book.id] = book

    def test_usrs_out_of_term(self):
        bookCopiesRet = get_borrows_out_of_time(3)

        for bookCopy in bookCopiesRet:
            self.assertEqual(bookCopy, self.bookCopies[bookCopy.id])


    def test_send_notification_to_be_true(self):
        self.assertTrue(send_notification(None))