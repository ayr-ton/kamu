from rest_framework import serializers
from django.db.models import Count
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
    books = serializers.SerializerMethodField()
    class Meta:
        model = Library
        fields = ('id', 'name', 'slug', 'books')
    def get_books(self, obj):
        books = obj.books.annotate(copies=Count('id'))
        serializer = BookSerializer(books, many=True, context=self.context)
        return serializer.data