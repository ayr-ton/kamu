import datetime

from django.core import mail
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from django.conf import settings

from books.models import Book, Library, BookCopy

from books.cron.send_notification import *

class SendNotificationsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("test@thoughtworks.com")
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

    def test_users_out_of_term(self):
        bookCopiesRet = get_borrows_out_of_time(settings.CRON_EMAIL_NOTIFICATION_SETTINGS["BORROW_MAX_TERM_MONTH"])

        for bookCopy in bookCopiesRet:
            self.assertEqual(bookCopy, self.bookCopies[bookCopy.id])


    def test_send_notification_assert_mail_sents(self):
        bookCopiesList = list(self.bookCopies.values())
        
        send_notification(bookCopiesList)

        self.assertEqual(len(mail.outbox), len(bookCopiesList))
        self.assertEqual(mail.outbox[0].subject, settings.CRON_EMAIL_NOTIFICATION_SETTINGS["TEMPLATE_SUBJECT"])