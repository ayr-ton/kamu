from celery import task
from django.core import mail


@task
def send_new_user_on_waitlist_notification(waitlist_item):
    book = waitlist_item.book
    borrowers = [copy.user for copy in book.bookcopy_set.exclude(user=None)]
    if len(borrowers) == 0:
        return

    waitlist_user_name = f'{waitlist_item.user.first_name} {waitlist_item.user.last_name}'
    subject = f'{waitlist_user_name} is waiting for the book {book.title} on Kamu'
    mail.send_mail(
        subject,
        'Hello! Another is user is waiting for the book you have borrowed on Kamu.',
        'Kamu <kamu-no-reply@thoughtworks.com>',
        [user.email for user in borrowers],
        fail_silently=False,
    )
