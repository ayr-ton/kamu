from django.db import models
from books.models import Library, Book, BookCopy
from django.conf import settings
from django.utils import timezone


class WaitlistItem(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    library = models.ForeignKey(Library, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="waitlist_items", on_delete=models.CASCADE)
    added_date = models.DateTimeField()

    class Meta:
        unique_together = [['book', 'library', 'user']]

    @classmethod
    def create_item(cls, library, book, user):
        copies = BookCopy.objects.filter(
            book=book, library=library,
        )
        if copies.count():
            available_copies = copies.filter(user=None)
            if available_copies.count() is 0:
                return WaitlistItem.objects.create(
                    book=book,
                    user=user,
                    library=library,
                    added_date=timezone.now(),
                )
            else:
                raise ValueError('There are available copies of this book.')
        else:
            raise ValueError('There are no copies of this book for your library.')