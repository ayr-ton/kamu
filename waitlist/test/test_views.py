from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from unittest.mock import patch

from books.models import Book, BookCopy, Library
from waitlist.models import WaitlistItem


class WaitlistViewSetTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="My library", slug="myslug")
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle")
        self.base_url = "/api/libraries/" + self.library.slug + \
            "/books/" + str(self.book.id) + \
            "/waitlist/"

    def test_should_return_201_response_when_create_item_is_successful(self):

        with patch.object(WaitlistItem, 'create_item', return_value=None) as create_mock:
            response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 201)

    def test_should_return_response_with_waitlist_item_when_create_item_is_successful(self):
        created_item = WaitlistItem(
            book=self.book,
            library=self.library,
            user=self.user,
            added_date=timezone.now())

        with patch.object(WaitlistItem, 'create_item', return_value=created_item):
            response = self.client.post(self.base_url)

        waitlist_item = response.data['waitlist_item']
        self.assertEqual(waitlist_item['user']['username'], 'claudia')
        self.assertIsNotNone(waitlist_item['added_date'])
        self.assertEqual(waitlist_item['library']['slug'], self.library.slug)
        self.assertEqual(waitlist_item['book']['id'], self.book.id)


    def test_should_return_404_response_when_create_item_raises_value_error(self):
        with patch.object(WaitlistItem, 'create_item', side_effect=ValueError):
            response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 404)
