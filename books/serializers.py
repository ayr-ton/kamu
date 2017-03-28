from rest_framework import serializers
from books.models import *


class BookSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Book
        fields = '__all__'

class LibraryCompactSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Library
        extra_kwargs = {'url': {'lookup_field': 'slug'}}
        fields = ('id', 'url', 'name', 'slug')

class LibrarySerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)
    class Meta:
        model = Library
        fields = ('id', 'name', 'slug', 'books')
