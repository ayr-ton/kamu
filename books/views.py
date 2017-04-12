from django.shortcuts import get_object_or_404
from hashlib import md5
from rest_framework.response import Response    
from rest_framework.views import APIView
from rest_framework import viewsets
from books.serializers import *
from books.models import *


class LibraryViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LibraryCompactSerializer
    lookup_field = 'slug'

    def retrieve(self, request, slug=None):
        library = Library.objects.get(slug=slug)
        serializer = LibrarySerializer(library, context={ 'request': request })
        return Response(serializer.data)

class BookCopyViewSet(viewsets.ModelViewSet):
    queryset = BookCopy.objects.all()
    serializer_class = BookCopySerializer

class UserView(APIView):
    def get(self, request, format=None):
        content = {
            'user': UserSerializer(request.user).data
        }
        return Response(content)