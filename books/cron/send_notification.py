import datetime
from dateutil.relativedelta import relativedelta
from django.core.mail import send_mail

from books.models import Book, Library, BookCopy

template = "Usuario, recuerde devolver el libro"

def send_notification(bookCopyList):
	send_mail(
		'Subject here',
		'Here is the message.',
		'from@example.com',
		['to@example.com'],
		fail_silently=False,
	)
	return True

def get_borrows_out_of_time(number_months_borrowed_limit):
	limitDate = datetime.datetime.today() - relativedelta(months=number_months_borrowed_limit)
	return list(BookCopy.objects.filter(borrow_date__lte=limitDate))
