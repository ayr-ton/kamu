#!/usr/bin/env python
import psycopg2
import psycopg2.extras
from dateutil.parser import parse
from books.models import Book

try:
    conn=psycopg2.connect("dbname='kamu_old'")
except:
    print('Unable to connect to the database.')

cur = conn.cursor(cursor_factory = psycopg2.extras.DictCursor)
cur.execute("SELECT * from book")

books = cur.fetchall()
total_books = cur.rowcount
imported_books = 0

for book in books:
    print('Importing ' + book['title'])
    if book['publicationdate']:
        try:
            publication_date = parse(book['publicationdate'])
        except Exception:
            print('Publication date could not be parsed (' + book['publicationdate'] + ')')
    
    new_book = Book.objects.update_or_create(
        author=book['author'],
        title=book['title'],
        subtitle=book['subtitle'],
        description=book['description'],
        image_url=book['imageurl'],
        isbn=book['isbn'],
        number_of_pages=book['numberofpages'],
        publication_date=publication_date,
        publisher=book['publisher'],
    )
    imported_books += 1

print("Imported %d books of %d." % (imported_books, total_books))
