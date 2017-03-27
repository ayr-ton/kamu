#!/usr/bin/env python
import psycopg2
import psycopg2.extras
from dateutil.parser import parse
from books.models import *


class KamuMigrator:
    def __init__(self):
        try:
            self.connection = psycopg2.connect("dbname='kamu_old'")
            self.cursor = self.connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
        except:
            print('Unable to connect to the database.')
    
    def migrate(self):
        self.migrate_books()
        self.migrate_libraries()
        self.migrate_copies()
    
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
            
            Book.objects.update_or_create(
                id=book['id'],
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
    
    def migrate_libraries(self):
        self.cursor.execute("SELECT * from library")
        libraries = self.cursor.fetchall()
        total_libraries = self.cursor.rowcount
        imported_libraries = 0
        
        for library in libraries:
            print('Importing ' + library['name'])
            
            Library.objects.update_or_create(
                id=library['id'],
                name=library['name'],
                slug=library['slug']
            )
            imported_libraries += 1
        
        print("Imported %d libraries of %d." % (imported_libraries, total_libraries))
    
    def migrate_copies(self):
        self.cursor.execute("SELECT * from copy")
        copies = self.cursor.fetchall()
        total_copies = self.cursor.rowcount
        imported_copies = 0
        
        for copy in copies:
            print('Importing copy ' + copy['id'])
            
            BookCopy.objects.update_or_create(
                id=copy['id'],
                book=Book.objects.get(pk=copy['book_id']),
                library=Library.objects.get(pk=copy['library_id'])
            )
            imported_copies += 1
        
        print("Imported %d copies of %d." % (imported_copies, total_copies))

migrator = KamuMigrator()
migrator.migrate()
