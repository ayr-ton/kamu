from django.contrib.auth.models import User
from django.core import mail
from django.test import TestCase
from django.utils import timezone

from books.models import Book, BookCopy, Library
from waitlist.models import WaitlistItem
from waitlist.tasks import send_new_user_on_waitlist_notification


class WaitlistTasksTest(TestCase):
    def setUp(self):
        self.book = Book.objects.create(
            author="Author", title="Clean Code", subtitle="The subtitle", publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(
            username="claudia", email="claudia@gmail.com", first_name="Claudia", last_name="Silva")
        self.waitlist_item = WaitlistItem.objects.create(
            book=self.book, library=self.library, user=self.user, added_date=timezone.now())

    def test_sends_waitlist_email_to_borrowers_of_book(self):
        borrower1 = User.objects.create(username="person 1", email="person1@gmail.com")
        borrower2 = User.objects.create(username="person 2", email="person2@gmail.com")
        BookCopy.objects.create(book=self.book, library=self.library, user=borrower1)
        BookCopy.objects.create(book=self.book, library=self.library, user=borrower2)

        send_new_user_on_waitlist_notification(self.waitlist_item.id)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, [borrower1.email, borrower2.email])

    def test_does_not_send_waitlist_email_to_a_book_without_borrowers(self):
        BookCopy.objects.create(book=self.book, library=self.library, user=None)

        send_new_user_on_waitlist_notification(self.waitlist_item.id)

        self.assertEqual(len(mail.outbox), 0)

    def test_sets_the_subject_with_the_book_title_and_waitlist_user_name(self):
        borrower1 = User.objects.create(username="person 1", email="person1@gmail.com")
        BookCopy.objects.create(book=self.book, library=self.library, user=borrower1)

        send_new_user_on_waitlist_notification(self.waitlist_item.id)

        self.assertEqual(mail.outbox[0].subject, 'Claudia Silva is waiting for the book Clean Code on Kamu')

    def test_includes_details_in_email_body(self):
        borrower1 = User.objects.create(username="person 1", email="person1@gmail.com")
        BookCopy.objects.create(book=self.book, library=self.library, user=borrower1)

        send_new_user_on_waitlist_notification(self.waitlist_item.id)

        email_body = mail.outbox[0].body
        self.assertIn('Claudia Silva is waiting for the book Clean Code', email_body)
        self.assertIn('no other copies are available in Santiago', email_body)
