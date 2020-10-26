import os
from django.contrib import messages, admin
from django.db.models import Count
from django.db.models import Q
from django.http import Http404
from django.shortcuts import render, redirect, get_object_or_404

from django.utils.http import urlencode
from django.views.generic.base import View, TemplateView
from filters.mixins import (
    FiltersMixin,
)
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from books.google import BookFinder
from books.serializers import *
from .forms import IsbnForm
from .models import Book as BookModel
from waitlist.models import WaitlistItem


class FrontendView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['analyticsAccountId'] = os.environ.get('ANALYTICS_ACCOUNT_ID')
        return context


class IsbnFormView(View):
    def get(self, request):
        form = IsbnForm()

        return render(request, 'isbn.html', {
            'form': form,
            'site_header': admin.site.site_header,
            'books_isbn_url': reverse('admin:books_book_isbn')
        })

    def post(self, request):
        form = IsbnForm(request.POST)
        if form.is_valid():
            isbn = form.cleaned_data["isbn"]
            book_from_db = BookModel.objects.filter(isbn=isbn).distinct()
            book = BookFinder.fetch(isbn)

            if book_from_db:
                 messages.warning(request, 'The requested book is on the table.')
                 return self.get(request)

            if book == {}:
                messages.warning(request, 'Sorry! We could not find the book with the ISBN provided.')
            else:
                messages.info(request, "Found! Go ahead, modify book template and save.")

            return redirect('{}?{}'.format(reverse('admin:books_book_add'), urlencode(book)))
        else:
            messages.error(request, 'Invalid ISBN provided!')

            return self.get(request)


def get_book_filters_from_request(request, filters=('book_title', 'book_author')):
    """Get book filters from a request
    Given a request, return all filters with __icontains
    Example:
        > filters=('book_title') returns {title__icontains} if request has a book_title attribute
    """
    query = Q()

    query_params = {query_param.strip(): request.query_params.get(query_param).strip() for query_param in request.query_params}

    query_filters = {filter[5:] + "__icontains": query_params.get(filter) for filter in filters if
            filter in query_params}

    for key in query_filters:
        query.add(Q(**{key: query_filters[key]}), Q.OR)

    return query


class LibraryViewSet(FiltersMixin, viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LibraryCompactSerializer
    lookup_field = 'slug'
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('id', 'name')
    ordering = ('name')

    filter_mappings = {
        'id': 'id',
        'name': 'name__icontains',
        'slug': 'slug__icontains'
    }


class BookViewSet(FiltersMixin, viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.filter()

    def list(self, request, library_slug=None):
        self.pagination_class.size = 1
        self.filter_backends = ()
        self.ordering_fields = ()
        self.ordering = ()

        library = get_object_or_404(Library, slug=library_slug)

        book_filters = get_book_filters_from_request(request, ('book_title', 'book_author', 'book_isbn'))
        book_filters.add(Q(bookcopy__library__slug__exact=library_slug), Q.AND)

        books = self.queryset.filter(book_filters).order_by('title')
        books = books.annotate(copies=Count('id'))

        page = self.paginate_queryset(books)

        serializer = BookCompactSerializer(page, many=True, context={
            'request': request,
            'library': library,
            'user': request.user,
        })

        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, pk, library_slug=None):
        book = get_object_or_404(self.queryset, pk=pk)
        library = get_object_or_404(Library, slug=library_slug)
        if not book.bookcopy_set.filter(library=library).exists():
            raise Http404()
        return self.__serialize_book(book, library, request)

    @action(detail=True, methods=['post'])
    def borrow(self, request, library_slug=None, pk=None):
        book = get_object_or_404(self.queryset, pk=pk)
        library = get_object_or_404(Library, slug=library_slug)
        return self.__handle_book_action(
            book=book,
            action=book.borrow,
            library=library,
            request=request,
        )

    @action(detail=True, methods=['post'], url_path='return', name='Return')
    def return_to_library(self, request, library_slug=None, pk=None):
        book = get_object_or_404(self.queryset, pk=pk)
        library = get_object_or_404(Library, slug=library_slug)
        return self.__handle_book_action(
            book=book,
            action=book.return_to_library,
            library=library,
            request=request,
        )

    @action(detail=True, methods=['patch'], url_path='missing', name='Report as missing')
    def report_missing(self, request, library_slug=None, pk=None):
        book = get_object_or_404(self.queryset, pk=pk)
        library = get_object_or_404(Library, slug=library_slug)
        try:
            book.report_as_missing(library=library)
            return self.__serialize_book(book, library, request)
        except ValueError as error:
            return Response({'message': str(error)}, status=400)

    @action(detail=True, methods=['patch'], url_path='found', name='Report book found')
    def report_found(self, request, library_slug=None, pk=None):
        book = get_object_or_404(self.queryset, pk=pk)
        library = get_object_or_404(Library, slug=library_slug)
        try:
            book.was_found(library=library)
            return self.__serialize_book(book, library, request)
        except ValueError as error:
            return Response({'message': str(error)}, status=400)

    def __handle_book_action(self, book, action, library, request):
        try:
            action(library=library, user=request.user)
            return self.__serialize_book(book, library, request)
        except ValueError as error:
            return Response({'message': str(error)}, status=400)

    def __serialize_book(self, book, library, request):
        serializer = BookSerializer(book, context={
            'request': request,
            'library': library,
            'user': request.user,
        })
        return Response(serializer.data)


class UserView(APIView):
    def get(self, request, format=None):
        return Response({
            'user': UserSerializer(request.user).data,
        })


class UserBooksView(APIView):
    def get(self, request, format=None):
        user_copies = BookCopy.objects.filter(user=request.user)
        return Response({
            'results': list(map(lambda book_copy: BookCompactSerializer(book_copy.book, context={
                'user': request.user,
                'request': request,
                'library': book_copy.library
            }).data, user_copies))
        })


class UserWaitlistView(APIView):
    def get(self, request, format=None):
        user_copies = WaitlistItem.objects.filter(user=request.user)
        return Response({
            'results': list(map(lambda book_copy: BookCompactSerializer(book_copy.book, context={
                'user': request.user,
                'request': request,
                'library': book_copy.library
            }).data, user_copies))
        })
