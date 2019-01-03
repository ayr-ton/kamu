from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class Book(models.Model):
    author = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image_url = models.TextField(null=True, blank=True)
    isbn = models.CharField(max_length=255, null=True, blank=True)
    number_of_pages = models.IntegerField(null=True, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return "%s (%s)" % (self.title, self.author)


class Library(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    books = models.ManyToManyField(Book, through='BookCopy')

    class Meta:
        verbose_name_plural = 'libraries'

    def __str__(self):
        return self.name


class BookCopy(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    library = models.ForeignKey(Library, related_name='wishes_copies', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    borrow_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Book copies'

    def __str__(self):
        return self.book.title


class WishList(models.Model):
    STATES = (('PENDING', 'PENDING'),
              ('PROCESSING', 'PROCESSING'),
              ('DONE', 'DONE'))
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    library = models.ForeignKey(Library, related_name='copies', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    state = models.CharField(max_length=255, choices=STATES, default='PENDING')

    class Meta:
        unique_together = ('book', 'library')

    def clean(self):
        if BookCopy.objects.filter(book=self.book):
            raise ValidationError('This book copy already exists.')


