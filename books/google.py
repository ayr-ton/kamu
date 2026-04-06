import logging

import requests


logger = logging.getLogger(__name__)


class ResponseParser(object):
    def __init__(self, isbn, content):
        self.isbn = isbn
        self.content = content

    def extract_book(self):
        if self.content['totalItems'] == 0:
            return {}

        return self._build(self.content['items'][-1])

    def _build(self, data):

        volume_info = {
            'authors': '',
            'description': '',
            'imageLinks': {'thumbnail': ''},
            'pageCount': '',
            'publishedDate': '',
            'publisher': '',
            'title': '',
            'subtitle': ''
        }

        volume_info = {**volume_info, **data['volumeInfo']}

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
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) '
                          'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
        }
        url = "{}?q=isbn:{}".format(cls.GOOGLE_BOOKS_URL, isbn)
        response = requests.get(url, headers=headers, verify=False)

        if response.status_code != cls.OK:
            return {}

        return ResponseParser(isbn, response.json()).extract_book()


class OpenLibraryFinder(object):
    BOOKS_URL = 'https://openlibrary.org/api/books'
    COVER_URL = 'https://covers.openlibrary.org/b/isbn/{}-L.jpg'
    OK = 200

    @classmethod
    def fetch(cls, isbn):
        try:
            params = {
                'bibkeys': f'ISBN:{isbn}',
                'format': 'json',
                'jscmd': 'data',
            }
            response = requests.get(cls.BOOKS_URL, params=params, timeout=5)
            if response.status_code != cls.OK:
                return {}

            data = response.json()
            key = f'ISBN:{isbn}'
            if key not in data:
                return {}

            return cls._build(isbn, data[key])
        except (requests.RequestException, KeyError, ValueError):
            logger.exception("Open Library lookup failed for ISBN %s", isbn)
            return {}

    @classmethod
    def _build(cls, isbn, data):
        authors = ', '.join(a.get('name', '') for a in data.get('authors', []))
        return {
            'isbn': isbn,
            'title': data.get('title', ''),
            'subtitle': data.get('subtitle', ''),
            'author': authors,
            'publisher': ', '.join(
                p.get('name', '') for p in data.get('publishers', [])
            ),
            'publication_date': data.get('publish_date', ''),
            'number_of_pages': data.get('number_of_pages', ''),
            'description': '',
            'image_url': cls.COVER_URL.format(isbn),
        }


def lookup_isbn(isbn):
    """Try Open Library first (free, good covers), fall back to Google Books."""
    result = OpenLibraryFinder.fetch(isbn)
    if result:
        google_result = BookFinder.fetch(isbn)
        if google_result and not result.get('description'):
            result['description'] = google_result.get('description', '')
        return result

    return BookFinder.fetch(isbn)
