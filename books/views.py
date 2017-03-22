from rest_framework import viewsets
from books.serializers import BookSerializer
from books.models import Book


class BookViewSet(viewsets.ModelViewSet):
	queryset = Book.objects.all()
	serializer_class = BookSerializer
