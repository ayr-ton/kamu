from django.db import IntegrityError
from django.shortcuts import render
from filters.mixins import FiltersMixin
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone

from books.models import Book, Library
from books.serializers import BookSerializer
from .models import WaitlistItem, Waitlist
from .serializers import WaitlistItemSerializer


class WaitlistViewSet(FiltersMixin, viewsets.ModelViewSet):
    serializer_class = WaitlistItemSerializer
    queryset = WaitlistItem.objects.filter()

    def create(self, request, library_slug=None, book_pk=None):
        try:
            library = Library.objects.get(slug=library_slug)
            item = WaitlistItem.create_item(
                library,
                Book.objects.get(pk=book_pk),
                request.user,
            )
            book = Book.objects.get(pk=book_pk)
            return self.__serialize_book(book, library, request, status=201)
        except ValueError as error:
            return Response({
                'message': str(error),
            }, status=404)
        except IntegrityError as error:
            return Response({
                'message': str(error),
            }, status=409)

    @action(detail=False, methods=['get'])
    def check(self, request, library_slug=None, book_pk=None):
        return Response({
            'status': Waitlist(book_pk,library_slug).status_for(request.user),
        }, status=200)

    def delete(self, request, library_slug=None, book_pk=None):
        library = Library.objects.get(slug=library_slug)
        WaitlistItem.objects.filter(
            library=library,
            user=request.user,
            book=book_pk
        ).delete()
        book = Book.objects.get(pk=book_pk)
        return self.__serialize_book(book, library, request)

    def __serialize_book(self, book, library, request, status=200):
        serializer = BookSerializer(book, context={
                'request': request,
                'library': library,
                'user': request.user,
            })
        return Response(serializer.data, status=status)