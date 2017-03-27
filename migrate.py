#!/usr/bin/env python
import psycopg2
import psycopg2.extras
from dateutil.parser import parse
from books.models import Book


class KamuMigrator:
    def __init__(self):
        try:
            self.connection = psycopg2.connect("dbname='kamu_old'")
            self.cursor = self.connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
        except:
            print('Unable to connect to the database.')
    
    def migrate(self):
        self.migrate_books()
    
    def migrate_books(self):
        self.cursor.execute("SELECT * from book")
        books = self.cursor.fetchall()
        total_books = self.cursor.rowcount
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

migrator = KamuMigrator()
migrator.migrate()
