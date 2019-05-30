from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from django.db.utils import IntegrityError

from books.models import Book, BookCopy, Library
from waitlist.models import WaitlistItem


class WaitlistItemTest(TestCase):
    def setUp(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")
        self.added_date = timezone.now()

    def test_can_instantiate_wailist_item(self):
        self.waitlist_item = WaitlistItem.objects.create(
            book=self.book, library=self.library, user=self.user, added_date=self.added_date,
        )
        self.assertEqual(self.waitlist_item.book, self.book)
        self.assertEqual(self.waitlist_item.library, self.library)
        self.assertEqual(self.waitlist_item.user, self.user)
        self.assertEqual(self.waitlist_item.added_date, self.added_date)

    def test_cannot_instantiate_wailist_item_without_book(self):
        self.assertRaises(
            IntegrityError,
            WaitlistItem.objects.create,
            library=self.library, user=self.user, added_date=self.added_date,
        )

    def test_cannot_instantiate_wailist_item_without_library(self):
        self.assertRaises(
            IntegrityError,
            WaitlistItem.objects.create,
            book=self.book, user=self.user, added_date=self.added_date,
        )

    def test_cannot_instantiate_wailist_item_without_user(self):
        self.assertRaises(
            IntegrityError,
            WaitlistItem.objects.create,
            book=self.book, library=self.library, added_date=self.added_date,
        )

    def test_cannot_instantiate_wailist_item_without_date(self):
        self.assertRaises(
            IntegrityError,
            WaitlistItem.objects.create,
            book=self.book, library=self.library, user=self.user,
        )

    def test_that_a_creation_of_waitlist_item_reflects_in_library(self):
        self.assertEqual(self.library.waitlist_items.count(), 0)
        self.waitlist_item = WaitlistItem.objects.create(
            book=self.book, library=self.library, user=self.user, added_date=self.added_date,
        )
        self.assertEqual(self.library.waitlist_items.count(), 1)

    def test_that_a_creation_of_waitlist_item_reflects_in_user(self):
        self.assertEqual(self.user.waitlist_items.count(), 0)
        self.waitlist_item = WaitlistItem.objects.create(
            book=self.book, library=self.library, user=self.user, added_date=self.added_date,
        )
        self.assertEqual(self.user.waitlist_items.count(), 1)

    def test_that_a_creation_of_waitlist_item_reflects_in_book(self):
        self.assertEqual(self.book.waitlist_items.count(), 0)
        self.waitlist_item = WaitlistItem.objects.create(
            book=self.book, library=self.library, user=self.user, added_date=self.added_date,
        )
        self.assertEqual(self.book.waitlist_items.count(), 1)

class CreateItemTest(TestCase):
    def setUp(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")
        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")
        self.copy = BookCopy.objects.create(book=self.book, library=self.library, user=self.user)

    def test_should_create_waitlist_item_and_return_its_value(self):
        initialCount = WaitlistItem.objects.all().count()

        item = WaitlistItem.create_item(
            self.library, self.book, self.user,
        )

        finalCount = WaitlistItem.objects.all().count()
        self.assertEqual(initialCount + 1, finalCount)

        self.assertEqual(item.book, self.book)
        self.assertEqual(item.user, self.user)
        self.assertEqual(item.library, self.library)
        self.assertIsNotNone(item.added_date)

    def test_should_create_and_return_waitlist_item_if_theres_only_unavailable_copies(self):
        item = WaitlistItem.create_item(
            self.library, self.book, self.user,
        )
        self.assertIsInstance(item, WaitlistItem)

    def test_should_not_create_waitlist_item_and_raise_exception_if_there_are_available_copies(self):
        self.copy.user = None
        self.copy.save()

        with self.assertRaises(ValueError):
            item = WaitlistItem.create_item(
                self.library, self.book, self.user,
            )

    def test_should_not_create_waitlist_item_and_raise_exception_if_there_are_no_copies(self):
        self.copy.delete()

        with self.assertRaises(ValueError):
            item = WaitlistItem.create_item(
                self.library, self.book, self.user,
            )
