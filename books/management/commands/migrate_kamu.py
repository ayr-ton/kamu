from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from dateutil.parser import parse
from books.models import *
import psycopg2
import psycopg2.extras

class Command(BaseCommand):
    help = 'Migrates a Kamu legacy database to the current schema.\n\n\
        This script assumes you have a local PostgreSQL server containing\
        the legacy database with the specified name.'

    def add_arguments(self, parser):
        parser.add_argument('database', type=str)
    
    def handle(self, *args, **options):
        self.connection = psycopg2.connect("dbname='%s'" % options['database'])
        self.cursor = self.connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
        self.migrate_books()
        self.migrate_libraries()
        self.migrate_copies()
        self.migrate_users()
        self.migrate_loans()
    
    def migrate_books(self):
        self.cursor.execute("SELECT * from book")
        books = self.cursor.fetchall()
        total_books = self.cursor.rowcount
        imported_books = 0
        
        for book in books:
            print('Importing %s...' % book['title'])
            if book['publicationdate']:
                try:
                    publication_date = parse(book['publicationdate'])
                except Exception:
                    print('Publication date could not be parsed (' + book['publicationdate'] + ')')
            
            Book.objects.update_or_create(
                id=book['id'],
                defaults={
                    'author': book['author'],
                    'title': book['title'],
                    'subtitle': book['subtitle'],
                    'description': book['description'],
                    'image_url': book['imageurl'],
                    'isbn': book['isbn'],
                    'number_of_pages': book['numberofpages'],
                    'publication_date': publication_date,
                    'publisher': book['publisher']
                }
            )
            imported_books += 1
        
        print("Imported %d books of %d." % (imported_books, total_books))
    
    def migrate_libraries(self):
        self.cursor.execute("SELECT * from library")
        libraries = self.cursor.fetchall()
        total_libraries = self.cursor.rowcount
        imported_libraries = 0
        
        for library in libraries:
            print('Importing %s...' % library['name'])
            Library.objects.update_or_create(
                id=library['id'],
                defaults={
                    'name': library['name'],
                    'slug': library['slug']
                }
            )
            imported_libraries += 1
        
        print("Imported %d libraries of %d." % (imported_libraries, total_libraries))
    
    def migrate_copies(self):
        self.cursor.execute("SELECT * from copy")
        copies = self.cursor.fetchall()
        total_copies = self.cursor.rowcount
        imported_copies = 0
        
        for copy in copies:
            print('Importing copy %d' % copy['id'])
            BookCopy.objects.update_or_create(
                id=copy['id'],
                defaults={
                    'book': Book.objects.get(pk=copy['book_id']),
                    'library': Library.objects.get(pk=copy['library_id'])
                }
            )
            imported_copies += 1
        
        print("Imported %d copies of %d." % (imported_copies, total_copies))
     
    def migrate_users(self):
        self.cursor.execute("SELECT * from users")
        users = self.cursor.fetchall()
        total_users = self.cursor.rowcount
        imported_users = 0
        
        for user in users:
            print('Importing user %s' % user['name'])
            names = user['name'].split(' ')
            User.objects.update_or_create(
                id=user['id'],
                defaults={
                    'email': user['email'],
                    'username': user['email'],
                    'first_name': names[0],
                    'last_name': names[-1]
                }
            )
            imported_users += 1
        
        print("Imported %d users of %d." % (imported_users, total_users))
    
    def migrate_loans(self):
        self.cursor.execute("SELECT * from loan")
        loans = self.cursor.fetchall()
        total_loans = self.cursor.rowcount
        imported_loans = 0
        
        for loan in loans:
            print('Importing loan %d' % loan['id'])
            BookCopy.objects.update_or_create(
                id=loan['copy_id'],
                defaults={
                    'user': User.objects.get(pk=loan['user_id'])
                }
            )
            imported_loans += 1
        
        print("Imported %d loans of %d." % (imported_loans, total_loans))
