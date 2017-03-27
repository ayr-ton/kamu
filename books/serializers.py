from rest_framework import serializers
from books.models import *


class BookSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Book
        fields = '__all__'

class LibrarySerializer(serializers.HyperlinkedModelSerializer):
    books = serializers.HyperlinkedIdentityField(view_name='book-detail', many=True)
    class Meta:
        model = Library
        fields = ('id', 'url', 'name', 'slug', 'books')
