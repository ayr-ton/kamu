from django.conf import settings
from django.db import models
from django.utils import timezone

from waitlist.tasks import send_waitlist_book_available_notification

BOOK_RETURN_ACTION = 'RETURN'
BOOK_BORROW_ACTION = 'BORROW'
BOOK_JOIN_WAITLIST_ACTION = 'JOIN_WAITLIST'
BOOK_LEAVE_WAITLIST_ACTION = 'LEAVE_WAITLIST'


def create_book_action(type):
    return {'type': type}


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

    def is_available(self, library):
        return self.__get_available_copy(library=library) is not None

    def is_borrowed_by_user(self, user, library=None):
        return self.__get_borrowed_copy(user=user, library=library) is not None

    def is_on_users_waitlist(self, user, library):
        return self.__get_waitlist_query(user=user, library=library).exists()

    def users_waitlist_added_date(self, user, library):
        waitlist_item = self.__get_waitlist_query(user=user, library=library).first()
        return waitlist_item.added_date if waitlist_item is not None else None

    def available_action(self, user, library=None):
        if self.is_borrowed_by_user(user, library):
            return create_book_action(BOOK_RETURN_ACTION)
        if self.is_available(library):
            return create_book_action(BOOK_BORROW_ACTION)
        if self.is_on_users_waitlist(user, library):
            return create_book_action(BOOK_LEAVE_WAITLIST_ACTION)
        else:
            return create_book_action(BOOK_JOIN_WAITLIST_ACTION)
        return None

    def borrow(self, user, library):
        available_copy = self.__get_available_copy(library=library)
        if available_copy is None:
            raise ValueError('Book is not available for borrowing.')

        available_copy.user = user
        available_copy.borrow_date = timezone.now()
        available_copy.save()

        self.__get_waitlist_query(user=user, library=library).delete()

    def returnToLibrary(self, user, library):
        borrowed_copy = self.__get_borrowed_copy(user=user, library=library)
        if borrowed_copy is None:
            raise ValueError('Book cannot be returned because it was not borrowed by the user.')

        borrowed_copy.user = None
        borrowed_copy.borrow_date = None
        borrowed_copy.save()

        send_waitlist_book_available_notification.delay(borrowed_copy.pk)

    def __get_available_copy(self, library):
        return self.bookcopy_set.filter(library=library, user=None).first()

    def __get_borrowed_copy(self, user, library):
        user_copies = self.bookcopy_set.filter(user=user)
        if library is not None:
            user_copies = user_copies.filter(library=library)
        return user_copies.first()

    def __get_waitlist_query(self, user, library):
        return self.waitlistitem_set.filter(user=user, library=library)


class Library(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    books = models.ManyToManyField(Book, through='BookCopy')
    waitlist_items = models.ManyToManyField(Book, related_name='waitlist_items', through='waitlist.WaitlistItem')

    class Meta:
        verbose_name_plural = 'libraries'

    def __str__(self):
        return self.name


class BookCopy(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    library = models.ForeignKey(Library, related_name='copies', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    borrow_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Book copies'

    def __str__(self):
        return self.book.title

