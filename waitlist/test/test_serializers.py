from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User
from unittest.mock import patch

from waitlist.models import WaitlistItem
from waitlist.serializers import WaitlistItemSerializer

from books.models import Book, Library
from waitlist.models import WaitlistItem
from books import serializers

class WaitlistItemSerializerTest(TestCase):

    def setUp(self):
        self.user = User(username="claudia")
        self.library = Library(name="My library", slug="myslug")
        self.book = Book(author="Author", title="the title", subtitle="The subtitle",
                                        publication_date=timezone.now())
        self.added_date = timezone.now()
        self.waitlist_item_attributes = {
            'user': self.user,
            'book': self.book,
            'library': self.library,
            'added_date': self.added_date,
        }

    def test_serialize_all_fields(self):
        waitlist_item = WaitlistItem(id = 1, **self.waitlist_item_attributes)

        with patch.object(serializers, 'LibrarySerializer', return_value='library'), \
             patch.object(serializers, 'BookCompactSerializer', return_value='book'), \
             patch.object(serializers, 'UserSerializer', return_value='user'):
            serializer = WaitlistItemSerializer(instance=waitlist_item)
            data = serializer.data

        self.assertEqual(set(data.keys()), set(['id','library', 'book', 'user', 'added_date']))