from django.shortcuts import render
from filters.mixins import FiltersMixin
from rest_framework import viewsets
from rest_framework.response import Response
from django.utils import timezone

from books.models import Book, Library, BookCopy
from .models import WaitlistItem
from .serializers import WaitlistItemSerializer

# Create your views here.
class WaitlistViewSet(FiltersMixin, viewsets.ModelViewSet):
    serializer_class = WaitlistItemSerializer
    queryset = WaitlistItem.objects.filter()

    def create(self, request, library_slug=None, book_pk=None):
        book = Book.objects.get(pk=book_pk)
        library=Library.objects.get(slug=library_slug)

        try:
            available_copies = BookCopy.objects.get(
                borrow_date=None,
                book=book, library=library,
            )
            return Response({
                'message': 'There are available copies of this book.',
            }, status=404)
        except BookCopy.DoesNotExist:
            item = WaitlistItem.objects.create(
                book=book,
                user=request.user,
                library=library,
                added_date=timezone.now(),
            )
            data = WaitlistItemSerializer(item, context={'request': request}).data
            return Response({
                'waitlist_item': data,
            }, status=201)