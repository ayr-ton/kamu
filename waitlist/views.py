from django.shortcuts import render
from filters.mixins import FiltersMixin
from rest_framework import viewsets
from rest_framework.response import Response
from django.utils import timezone

from books.models import Book, Library
from .models import WaitlistItem
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
            data = WaitlistItemSerializer(item, context={
                'request': request,
                'library': library,
                'user': request.user,
            }).data
            return Response({
                'waitlist_item': data,
            }, status=201)
        except ValueError as error:
            return Response({
                'message': str(error),
            }, status=404)


    def delete(self, request, library_slug=None, book_pk=None):
        library = Library.objects.get(slug=library_slug)
        WaitlistItem.objects.filter(
            library=library,
            user=request.user,
            book=book_pk
        ).delete()
        return Response(status=200)