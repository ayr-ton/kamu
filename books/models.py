from django.db import models


class Book(models.Model):
    author = models.CharField(max_length = 255)
    title = models.CharField(max_length = 255)
    subtitle = models.CharField(max_length = 255)
    description = models.TextField()
    image_url = models.CharField(max_length = 255)
    isbn = models.CharField(max_length = 255)
    number_of_pages = models.IntegerField()
    publication_date = models.DateField()
    publisher = models.CharField(max_length = 255)

    def __str__(self):
        return self.title