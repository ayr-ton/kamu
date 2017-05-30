from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from books.serializers import *


class LibraryViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LibraryCompactSerializer
    lookup_field = 'slug'

    def retrieve(self, request, slug=None):
        library = Library.objects.get(slug=slug)
        serializer = LibrarySerializer(library, context={'request': request})
        return Response(serializer.data)


class BookCopyViewSet(viewsets.ModelViewSet):
    queryset = BookCopy.objects.all()
    serializer_class = BookCopySerializer


class BookCopyBorrowView(APIView):
    def post(self, request, id=None):
        book_copy = BookCopy.objects.get(pk=id)
        book_copy.user = request.user
        book_copy.save()
        return Response({'status': 'Book borrowed'})


class BookCopyReturnView(APIView):
    def post(self, request, id=None):
        book_copy = BookCopy.objects.get(pk=id)
        book_copy.user = None
        book_copy.save()
        return Response({'status': 'Book returned'})


class UserView(APIView):
    def get(self, request, format=None):
        content = {
            'user': UserSerializer(request.user).data
        }
        return Response(content)
