from django.http import Http404
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.views import APIView

from books.serializers import *


class BookAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        # Don't forget to filter out results depending on the visitor !
        if not self.request.user.is_authenticated():
            return Book.objects.none()

        qs = Book.objects.order_by('title')

        if self.q:
            qs = qs.filter(title__icontains=self.q)

        return qs


class LibraryViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LibraryCompactSerializer
    lookup_field = 'slug'

    @detail_route(methods=['get'], url_name='books')
    def books(self, request, slug=None):
        self.pagination_class.size = 1
        books = BookCopy.objects.filter(library__slug__exact=slug)
        page = self.paginate_queryset(books)
        serializer = BookCopySerializer(page, many=True, context={'request': request})

        return self.get_paginated_response(serializer.data)


class BookCopyViewSet(viewsets.ModelViewSet):
    queryset = BookCopy.objects.all()
    serializer_class = BookCopySerializer


class BookCopyBorrowView(APIView):
    def post(self, request, id=None):
        try:
            book_copy = BookCopy.objects.get(pk=id)
            book_copy.user = request.user
            book_copy.borrow_date = timezone.now()
            book_copy.save()
        except BookCopy.DoesNotExist:
            raise Http404("Book Copy not found")
        return Response({'status': 'Book borrowed'})


class BookCopyReturnView(APIView):
    def post(self, request, id=None):
        try:
            book_copy = BookCopy.objects.get(pk=id)
            book_copy.user = None
            book_copy.borrow_date = None
            book_copy.save()
        except:
            raise Http404("Book Copy not found")
        return Response({'status': 'Book returned'})


class UserView(APIView):
    def get(self, request, format=None):
        content = {
            'user': UserSerializer(request.user).data
        }
        return Response(content)
