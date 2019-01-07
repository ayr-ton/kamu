from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from books.models import Book, BookCopy, Library
from waitlist.models import WaitlistItem


class WaitlistViewSetTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="My library", slug="myslug")
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())

        self.base_url = "/api/libraries/" + self.library.slug + \
            "/books/" + str(self.book.id) + \
            "/waitlist/"

    def test_add_book_to_waitlist_should_return_201_code(self):
        response = self.client.post(self.base_url)
        self.assertEqual(response.status_code, 201)

    def test_add_book_to_waitlist_should_return_created_item(self):
        response = self.client.post(self.base_url)

        waitlist_item = response.data['waitlist_item']
        self.assertEqual(waitlist_item['user']['username'], 'claudia')
        self.assertIsNotNone(waitlist_item['added_date'])
        self.assertEqual(waitlist_item['library']['slug'], self.library.slug)
        self.assertEqual(waitlist_item['book'], self.book.id)

    def test_add_book_to_waitlist_should_create_an_waitlist_item(self):
        self.assertEqual(self.user.waitlist_items.count(), 0)
        initialCount = WaitlistItem.objects.all().count()

        response = self.client.post(self.base_url)

        finalCount = WaitlistItem.objects.all().count()
        self.assertEqual(self.user.waitlist_items.count(), 1)
        self.assertEqual(initialCount + 1, finalCount)

    def test_should_not_add_book_to_waitlist_if_there_are_copies_available(self):
        initialCount = WaitlistItem.objects.all().count()
        BookCopy.objects.create(book=self.book, library=self.library)

        response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 404)
        finalCount = WaitlistItem.objects.all().count()
        self.assertEqual(initialCount, finalCount)

    def test_should_add_book_to_waitlist_if_there_are_no_copies_available(self):
        initialCount = WaitlistItem.objects.all().count()
        BookCopy.objects.create(book=self.book, library=self.library, borrow_date=timezone.now())

        response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 201)
        finalCount = WaitlistItem.objects.all().count()
        self.assertEqual(initialCount + 1, finalCount)

