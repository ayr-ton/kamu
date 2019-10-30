from rest_framework import serializers

from books.serializers import UserSerializer, BookSerializer, LibrarySerializer
from waitlist.models import WaitlistItem


class WaitlistItemSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    library = LibrarySerializer()
    book = BookSerializer()
    added_date = serializers.DateTimeField()

    class Meta:
        model = WaitlistItem
        fields = '__all__'