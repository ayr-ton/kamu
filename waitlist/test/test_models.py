from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from django.db.utils import IntegrityError

from books.models import Book, BookCopy, Library
from waitlist.models import WaitlistItem, Waitlist


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

    def test_cannot_instantiate_duplicated_item(self):
        self.book.waitlistitem_set.create(library=self.library, user=self.user, added_date=timezone.now())
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


def add_to_waitlist(book, user, library, added_date):
    return book.waitlistitem_set.create(library=library, user=user, added_date=added_date)


class WaitlistTest(TestCase):
    def setUp(self):
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.book_with_no_waitlist = Book.objects.create(author="Another Author", title="another title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.library = Library.objects.create(name="Santiago", slug="slug")

        self.user = User.objects.create(username="claudia", email="claudia@gmail.com")
        self.another_user = User.objects.create(username="Marielle Franco", email="marielle@gmail.com")
        self.yet_another_user = User.objects.create(username="Angela Davis", email="angela@gmail.com")

        self.now = timezone.now()
        add_to_waitlist(self.book, self.user, self.library, self.now)
        add_to_waitlist(self.book, self.another_user, self.library, self.now - timedelta(days=7))

    def test_should_have_items_based_on_book_and_library(self):
        waitlist = Waitlist(self.book.id, self.library.slug)
        self.assertEqual(len(waitlist.items), 2)

    def test_status_for_shoud_return_NO_WAITLIST_if_waitlist_is_empty(self):
        waitlist = Waitlist(self.book_with_no_waitlist.id, self.library.slug)

        self.assertTrue(waitlist.is_empty())
        self.assertEqual(waitlist.status_for(self.yet_another_user), 'NO_WAITLIST')

    def test_status_for_shoud_return_FIRST_ON_WAITLIST_if_user_is_on_waitlist_the_longest(self):
        waitlist = Waitlist(self.book.id, self.library.slug)

        self.assertEqual(waitlist.status_for(self.another_user), 'FIRST_ON_WAITLIST')

    def test_status_for_shoud_return_OTHERS_ARE_WAITING_if_there_are_users_waiting_for_longer(self):
        waitlist = Waitlist(self.book.id, self.library.slug)

        self.assertEqual(waitlist.status_for(self.yet_another_user), 'OTHERS_ARE_WAITING')

