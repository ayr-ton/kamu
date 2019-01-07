from django.db import models
from books.models import Library, Book
from django.conf import settings


class WaitlistItem(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    library = models.ForeignKey(Library, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="waitlist_items", on_delete=models.CASCADE)
    added_date = models.DateTimeField()

