from django.contrib import messages, admin
from django.db.models import Count
from django.db.models import Q
from django.http import Http404
from django.shortcuts import render, redirect
from django.utils import timezone
from django.utils.http import urlencode
from django.views.generic.base import View
from filters.mixins import (
    FiltersMixin,
)
from rest_framework import viewsets, filters
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.views import APIView

from books.google import BookFinder
from books.serializers import *
from .forms import IsbnForm


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
            book = BookFinder.fetch(isbn)

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
    ordering = ('id',)  # default ordering

    # add a mapping of query_params to db_columns(queries)
    filter_mappings = {
        'id': 'id',
        'name': 'name__icontains',
        'slug': 'slug__icontains'
    }

    @detail_route(methods=['get'], url_name='books')
    def books(self, request, slug=None):
        self.pagination_class.size = 1
        self.filter_backends = ()
        self.ordering_fields = ()
        self.ordering = ()

        library = Library.objects.get(slug=slug)

        book_filters = get_book_filters_from_request(request, ('book_title', 'book_author'))
        book_filters.add(Q(bookcopy__library__slug__exact=slug), Q.AND)

        books = Book.objects.filter(book_filters).order_by('title')
        books = books.annotate(copies=Count('id'))

        page = self.paginate_queryset(books)

        serializer = LibraryBookSerializer(page, many=True, context={'request': request, 'library': library})

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
