from django.contrib.auth.models import User
from django.db import IntegrityError
from django.test import TestCase
from django.utils import timezone
from unittest.mock import patch

from books.models import Book, BookCopy, Library
from waitlist.models import WaitlistItem, Waitlist


class WaitlistViewSetTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(user=self.user)

        self.library = Library.objects.create(name="My library", slug="myslug")
        self.book = Book.objects.create(author="Author", title="the title", subtitle="The subtitle")
        self.base_url = f'/api/libraries/{self.library.slug}/books/{str(self.book.id)}/waitlist/'

    def test_should_return_201_response_when_create_item_is_successful(self):
        with patch.object(WaitlistItem, 'create_item', return_value=None) as create_mock:
            response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 201)

    def test_join_waitlist_returns_book_with_leave_waitlist_action(self):
        created_item = self.book.waitlistitem_set.create(
            library=self.library,
            user=self.user,
            added_date=timezone.now())

        with patch.object(WaitlistItem, 'create_item', return_value=created_item):
            response = self.client.post(self.base_url)

        self.assertEqual(response.data['action']['type'], 'LEAVE_WAITLIST')

    def test_should_return_404_response_when_create_item_raises_value_error(self):
        with patch.object(WaitlistItem, 'create_item', side_effect=ValueError):
            response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 404)

    def test_should_return_409_response_when_creating_item_already_on_waitlist(self):
        with patch.object(WaitlistItem, 'create_item', side_effect=IntegrityError):
            response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, 409)

    def test_should_return_200_response_when_delete_item_is_successful(self):
        with patch.object(WaitlistItem, 'delete', return_value=None) as create_mock:
            response = self.client.delete(self.base_url)

        self.assertEqual(response.status_code, 200)

    def test_leave_waitlist_returns_book_with_join_waitlist_action(self):
        with patch.object(WaitlistItem, 'delete', return_value=None) as create_mock:
            response = self.client.delete(self.base_url)

        self.assertEqual(response.data['action']['type'], 'JOIN_WAITLIST')

    def test_check_should_return_the_corresponding_status(self):
        with patch.object(Waitlist, 'status_for', return_value='MOCKED_STATUS') as mock:
            response = self.client.get(f'{self.base_url}check/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['status'], 'MOCKED_STATUS')
