from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from hashlib import md5
from rest_framework.response import Response    
from rest_framework.views import APIView
from rest_framework import viewsets
from books.serializers import *
from books.models import *


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class LibraryViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LibraryCompactSerializer
    lookup_field = 'slug'

    def retrieve(self, request, slug=None):
        library = Library.objects.get(slug=slug)
        serializer = LibrarySerializer(library, context={ 'request': request })
        return Response(serializer.data)

class UserSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username', 'email', 'image_url')
    def get_image_url(self, obj):
        email_hash = md5(obj.email.strip().lower().encode()).hexdigest()
        return "https://www.gravatar.com/avatar/%s?size=100" % email_hash

class UserView(APIView):
    def get(self, request, format=None):
        content = {
            'user': UserSerializer(request.user).data
        }
        return Response(content)