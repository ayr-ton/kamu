import datetime
from dateutil.relativedelta import relativedelta

from books.models import Book, Library, BookCopy

def send_notification(bookCopyList):
    print("Hola mundo")
    for bookCopy in bookCopyList:
        print(bookCopy.user+" recuerda devolver "+bookCopy.book.title)

def get_borrows_out_of_time(number_months_borrowed_limit):
    limitDate = datetime.datetime.today() - relativedelta(months=number_months_borrowed_limit)
    return list(BookCopy.objects.filter(borrow_date__lte=limitDate))
