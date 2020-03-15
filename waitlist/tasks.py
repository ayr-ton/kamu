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

    email_list = [user.email for user in borrowers]
    logger.info(f'Sending waitlist notification email to {email_list}')

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
        email_list,
    )

    logger.info(f'Waitlist email notification sent successfully')


@task
def send_waitlist_book_available_notification(book_copy_id):
    book_copy = apps.get_model('books', 'BookCopy').objects.get(pk=book_copy_id)
    book = book_copy.book
    waitlist_items = apps.get_model('waitlist', 'WaitlistItem').objects.filter(book=book, library=book_copy.library)
    users_on_waitlist = [item.user for item in waitlist_items]

    logger.info(f'Starting a waitlist notification task for book {book.title} available' +
                f'({len(users_on_waitlist)} users on waitlist in {book_copy.library.name})')

    if len(users_on_waitlist) == 0:
        logger.debug(f'Exiting task because the book {book.title} has no users on waitlist in {book_copy.library.name}')
        return

    email_list = [user.email for user in users_on_waitlist]
    logger.info(f'Sending waitlist book available notification email to {email_list}')

    subject = f'{book.title} is now available on Kamu'
    message = render_to_string('waitlist_book_available_email.txt', {
        'book_title': book.title,
        'library_name': book_copy.library.name,
    })

    mail.send_mail(
        subject,
        message,
        settings.EMAIL_FROM,
        email_list,
    )
