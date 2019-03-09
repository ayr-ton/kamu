from django.conf import settings
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

    def is_available(self, library):
        return self.bookcopy_set.filter(library=library, user=None).exists()

    def is_borrowed_by_user(self, library, user):
        return self.bookcopy_set.filter(library=library, user=user).exists()

    def is_on_users_waitlist(self, library, user):
        return self.waitlistitem_set.filter(library=library, user=user).exists()

    def available_action(self, library, user):
        if self.is_borrowed_by_user(library, user):
            return 'Return'
        if self.is_available(library):
            return 'Borrow'
        if not self.is_on_users_waitlist(library, user):
            return 'Join the Waitlist'
        return None


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

