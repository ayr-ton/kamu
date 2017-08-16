import datetime
from dateutil.relativedelta import relativedelta

from django.core.mail import send_mail
from django.conf import settings

from books.models import Book, Library, BookCopy



def send_borrows_out_of_time_notifications():
	borrow_book_out_of_time = get_borrows_out_of_time(settings.CRON_EMAIL_NOTIFICATION_SETTINGS["BORROW_MAX_TERM_MONTH"])
	send_notification(borrow_book_out_of_time)

def send_notification(book_list):
	for book_copy in book_list:
		send_mail(
			settings.CRON_EMAIL_NOTIFICATION_SETTINGS["TEMPLATE_SUBJECT"],
			settings.CRON_EMAIL_NOTIFICATION_SETTINGS["TEMPLATE_BODY"].format(bookName=book_copy.book.title, borrowedDate=book_copy.borrow_date, maxTerm=settings.CRON_EMAIL_NOTIFICATION_SETTINGS["BORROW_MAX_TERM_MONTH"]),
			settings.CRON_EMAIL_NOTIFICATION_SETTINGS["TEMPLATE_FROM"],
			[book_copy.user],
			fail_silently=False,
		)

def get_borrows_out_of_time(number_months_borrowed_limit):
	limitDate = datetime.datetime.today() - relativedelta(months=number_months_borrowed_limit)
	return list(BookCopy.objects.filter(borrow_date__lte=limitDate))