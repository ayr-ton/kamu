from celery import task
from django.apps import apps
from django.conf import settings
from django.core import mail
from django.template.loader import render_to_string


@task
def send_new_user_on_waitlist_notification(waitlist_item_id):
    waitlist_item = apps.get_model('waitlist', 'WaitlistItem').objects.get(pk=waitlist_item_id)
    book = waitlist_item.book
    borrowers = [copy.user for copy in book.bookcopy_set.exclude(user=None)]
    if len(borrowers) == 0:
        return

    waitlist_user_name = f'{waitlist_item.user.first_name} {waitlist_item.user.last_name}'
    subject = f'{waitlist_user_name} is waiting for the book {book.title} on Kamu'
    message = render_to_string('new_user_on_waitlist_notification_email.txt', {
        'waitlist_user_name': waitlist_user_name,
        'book_title': book.title,
        'library_name': waitlist_item.library.name,
    })

    mail.send_mail(
        subject,
        message,
        settings.EMAIL_FROM,
        [user.email for user in borrowers],
    )
