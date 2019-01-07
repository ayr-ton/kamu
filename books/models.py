from functools import wraps

from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver



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
    library = models.ForeignKey(Library, related_name='copies', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    borrow_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Book copies'

    def __str__(self):
        return self.book.title
      
      
class WishList(models.Model):
    STATES = (('PENDING', 'PENDING'),
              ('DONE', 'DONE'))
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    library = models.ForeignKey(Library, related_name='copies', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    state = models.CharField(max_length=255, choices=STATES, default='PENDING')

    class Meta:
        unique_together = ('book', 'library')

    def full_clean(self, exclude=None, validate_unique=True):
        if not self._state.adding:
            raise ValidationError('You cannot Edit this.')

    def clean(self):
        if BookCopy.objects.filter(book=self.book):
            raise ValidationError('This book copy already exists.')

    def __str__(self):
        return self.book.title


def skip_load_data(signal_handler):
    """
    Decorator that turns off signal handlers when loading fixture data.
    https://stackoverflow.com/posts/15625121/revisions
    """

    @wraps(signal_handler)
    def wrapper(*args, **kwargs):
        if kwargs['raw']:
            return
        signal_handler(*args, **kwargs)

    return wrapper


@skip_load_data
@receiver(post_save, sender=BookCopy)
def update_wishlist_book(sender, **kwargs):
    book_in_wishlist = WishList.objects.filter(book=kwargs['instance'].book,
                                               library=kwargs['instance'].library).first()
    if not book_in_wishlist:
        return
    book_in_wishlist.state = 'DONE'
    book_in_wishlist.save()
