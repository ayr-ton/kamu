from django.conf import settings
from django.db import models


class Book(models.Model):
    author = models.CharField(max_length = 255)
    title = models.CharField(max_length = 255)
    subtitle = models.CharField(max_length = 255, null=True)
    description = models.TextField(null=True)
    image_url = models.CharField(max_length = 255, null=True)
    isbn = models.CharField(max_length = 255, null=True)
    number_of_pages = models.IntegerField(null=True)
    publication_date = models.DateField(null=True)
    publisher = models.CharField(max_length = 255, null=True)

    def __str__(self):
        return self.title

class Library(models.Model):
    name = models.CharField(max_length = 255)
    slug = models.CharField(max_length = 255)

    def __str__(self):
        return self.name

class BookCopy(models.Model):
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    library_id = models.ForeignKey(Library, on_delete=models.CASCADE)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

