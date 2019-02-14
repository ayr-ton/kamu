from hashlib import md5

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.reverse import reverse

from books.models import *
from waitlist.models import *


class UserSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'email', 'image_url', 'first_name', 'last_name', 'name')

    def get_image_url(self, obj):
        email_hash = md5(obj.email.strip().lower().encode()).hexdigest()
        return 'https://www.gravatar.com/avatar/%s?size=100' % email_hash

    def get_name(self, obj):
        return obj.first_name + " " + obj.last_name


class BookCopySerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = BookCopy
        fields = ('id', 'user', 'borrow_date')


class BookSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    copies = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = '__all__'

    def get_copies(self, obj):
        if 'library' in self.context:
            copies = obj.bookcopy_set.filter(library=self.context['library'])
        else:
            copies = obj.bookcopy_set.all()
        serializer = BookCopySerializer(copies, many=True, context=self.context)
        return serializer.data


class BookCompactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'author', 'title')


class LibraryCompactSerializer(serializers.HyperlinkedModelSerializer):
    books = serializers.SerializerMethodField()

    class Meta:
        model = Library
        extra_kwargs = {'url': {'lookup_field': 'slug'}}
        fields = ('id', 'url', 'name', 'slug', 'books')

    def get_books(self, obj):
        return reverse('books-list', args=[obj.slug], request=self.context['request'])


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ('id', 'name', 'slug')
