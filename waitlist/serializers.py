from rest_framework import serializers

from books.serializers import UserSerializer, LibraryBookSerializer, LibraryCompactSerializer
from waitlist.models import WaitlistItem


class WaitlistItemSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    library = LibraryCompactSerializer()
    book = LibraryBookSerializer

    class Meta:
        model = WaitlistItem
        fields = ('id', 'user', 'book', 'library', 'added_date')