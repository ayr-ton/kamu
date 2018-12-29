import requests


class ResponseParser(object):
    def __init__(self, isbn, content):
        self.isbn = isbn
        self.content = content

    def extract_book(self):
        if self.content['totalItems'] == 0:
            return {}

        # Hit the following URL to get a sample response:
        #   https://www.googleapis.com/books/v1/volumes?q=isbn:9780133065268

        # TODO: show an intermediate page with all the items and prompt user to select the one which
        #   they would like to use as a template for adding a new book to the library.
        #   For now, we select the last book in the list.

        return self._build(self.content['items'][-1])

    def _build(self, data):
        volume_info = data['volumeInfo']
        # Avoiding null pointer beautifully 
        volume_info['authors'] = volume_info['authors'] or ''
        volume_info['description'] = volume_info['description'] or ''
        volume_info['imageLinks']['thumbnail'] = volume_info['imageLinks']['thumbnail'] or ''
        volume_info['pageCount'] = volume_info['pageCount'] or ''
        volume_info['publishedDate'] = volume_info['publishedDate'] or ''
        volume_info['publisher'] = volume_info['publisher'] or ''
        volume_info['subtitle'] = volume_info['subtitle'] or ''
        volume_info['title'] = volume_info['title'] or ''

        return {
            'isbn': self.isbn,
            'author': ', '.join(volume_info['authors']),
            'description': volume_info['description'],
            'image_url': volume_info['imageLinks']['thumbnail'],
            'number_of_pages': volume_info['pageCount'],
            'publication_date': volume_info['publishedDate'],
            'publisher': volume_info['publisher'],
            'subtitle': volume_info['subtitle'],
            'title': volume_info['title']
        }


class BookFinder(object):
    GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes'
    OK = 200

    @classmethod
    def fetch(cls, isbn):
        url = "{}?q=isbn:{}".format(cls.GOOGLE_BOOKS_URL, isbn)
        response = requests.get(url)

        if response.status_code != cls.OK:
            return {}

        return ResponseParser(isbn, response.json()).extract_book()
