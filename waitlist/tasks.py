from celery import task
from celery.utils.log import get_task_logger
from django.apps import apps
from django.conf import settings
from django.core import mail
from django.template.loader import render_to_string

logger = get_task_logger(__name__)


@task
def send_new_user_on_waitlist_notification(waitlist_item_id):
    waitlist_item = apps.get_model('waitlist', 'WaitlistItem').objects.get(pk=waitlist_item_id)
    book = waitlist_item.book
    borrowers = [copy.user for copy in book.bookcopy_set.exclude(user=None)]

    logger.info(f'Starting a waitlist notification task for book {book.title} ' +
                f'({len(borrowers)} borrowers in {waitlist_item.library.name})')

    if len(borrowers) == 0:
        logger.debug(f'Exiting task because the book {book.title} has no borrowers in {waitlist_item.library.name}')
        return

    borrowers_email_list = [user.email for user in borrowers]
    logger.info(f'Sending waitlist notification email for {borrowers_email_list}')

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
        borrowers_email_list,
    )

    logger.info(f'Waitlist email notification sent successfully')
