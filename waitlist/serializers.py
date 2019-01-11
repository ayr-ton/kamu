from rest_framework import serializers

from books.serializers import UserSerializer, BookCompactSerializer, LibrarySerializer
from waitlist.models import WaitlistItem


class WaitlistItemSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    library = LibrarySerializer()
    book = BookCompactSerializer()
    added_date = serializers.DateTimeField()

    class Meta:
        model = WaitlistItem
        fields = '__all__'