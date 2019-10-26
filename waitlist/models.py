from django.db import models, IntegrityError
from books.models import Library, Book, BookCopy
from django.conf import settings
from django.utils import timezone

NO_WAITLIST_STATUS = 'NO_WAITLIST'
FIRST_ON_WAITLIST_STATUS = 'FIRST_ON_WAITLIST'
OTHERS_ARE_WAITING_STATUS = 'OTHERS_ARE_WAITING'

class Waitlist:
    def __init__(self, book_pk, library_slug):
        book = Book.objects.get(pk=book_pk)
        library = Library.objects.get(slug=library_slug)
        self.items = WaitlistItem.objects.filter(book=book, library=library)

    def is_empty(self):
        return len(self.items) is 0

    def __is_user_first_on_waitlist(self, user):
        return not self.is_empty() and self.__ordered_items().first().user.id is user.id

    def __ordered_items(self):
        return self.items.order_by('added_date')

    def status_for(self, user):
        status = NO_WAITLIST_STATUS
        if not self.is_empty():
            if self.__is_user_first_on_waitlist(user):
                status = FIRST_ON_WAITLIST_STATUS
            else:
                status = OTHERS_ARE_WAITING_STATUS
        return status


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
                try:
                    return WaitlistItem.objects.create(
                        book=book,
                        user=user,
                        library=library,
                        added_date=timezone.now(),
                    )
                except IntegrityError as error:
                    raise IntegrityError('You are already on the waitlist for this book.')
            else:
                raise ValueError('There are available copies of this book.')
        else:
            raise ValueError('There are no copies of this book for your library.')