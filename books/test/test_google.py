from unittest import mock, TestCase

import httpretty

from books.google import BookFinder, ResponseParser


class BookFinderTest(TestCase):
    @httpretty.activate
    @mock.patch('books.google.ResponseParser')
    def test_should_parse_response_when_google_api_call_succeeds(self, mockResponseParser):
        httpretty.register_uri(
            httpretty.GET,
            "https://www.googleapis.com/books/v1/volumes?q=isbn:9780133065268",
            body='{"kind": "books#volumes", "totalItems": 0}',
            status=200)

        BookFinder.fetch('9780133065268')

        mockResponseParser.assert_called_with('9780133065268', {"kind": "books#volumes", "totalItems": 0})

    @httpretty.activate
    @mock.patch('books.google.ResponseParser')
    def test_should_parse_response_when_google_api_call_fails(self, mockResponseParser):
        httpretty.register_uri(
            httpretty.GET,
            "https://www.googleapis.com/books/v1/volumes?q=isbn:9780133065268",
            body='{"kind": "books#volumes", "totalItems": 0}',
            status=404)

        book = BookFinder.fetch('9780133065268')

        self.assertDictEqual(book, {})

        mockResponseParser.assert_not_called()


class ResponseParserTest(TestCase):
    def test_should_return_empty_dict_when_there_are_no_items_in_response(self):
        content = {"kind": "books#volumes", "totalItems": 0}
        book = ResponseParser('9780133065268', content).extract_book()

        self.assertDictEqual(book, {})

    def test_should_return_the_only_item_when_only_one_item_exists(self):
        content = {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "volumeInfo": {
                        "title": "Refactoring",
                        "subtitle": "Improving the Design of Existing Code",
                        "authors": [
                            "Martin Fowler",
                            "Kent Beck",
                            "John Brant",
                            "William Opdyke",
                            "Don Roberts"
                        ],
                        "publisher": "Addison-Wesley",
                        "publishedDate": "2012-03-09",
                        "description": "As the application of object technology--particularly bla bla bla.",
                        "pageCount": 455,
                        "imageLinks": {
                            "thumbnail": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        }
                    }
                }
            ]
        }

        book = ResponseParser('9780133065268', content).extract_book()

        self.assertDictEqual(book, {
            "author": "Martin Fowler, Kent Beck, John Brant, William Opdyke, Don Roberts",
            "description": "As the application of object technology--particularly bla bla bla.",
            "image_url": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "isbn": "9780133065268",
            "number_of_pages": 455,
            "publication_date": "2012-03-09",
            "publisher": "Addison-Wesley",
            "subtitle": "Improving the Design of Existing Code",
            "title": "Refactoring"
        })

    def test_should_return_the_last_item_when_more_than_one_item_exist(self):
        content = {
            "kind": "books#volumes",
            "totalItems": 2,
            "items": [
                {
                    "volumeInfo": {
                        "title": "Refactoring",
                        "subtitle": "Improving the Design of Existing Code",
                        "authors": [
                            "Martin Fowler",
                            "Kent Beck",
                            "John Brant",
                            "William Opdyke",
                            "Don Roberts"
                        ],
                        "publisher": "Addison-Wesley",
                        "publishedDate": "2012-03-09",
                        "description": "As the application of object technology--particularly bla bla bla.",
                        "pageCount": 455,
                        "imageLinks": {
                            "thumbnail": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        }
                    }
                },
                {
                    "volumeInfo": {
                        "title": "Refactoring II",
                        "subtitle": "Improving the Design of Existing Code the New Way",
                        "authors": [
                            "Martin Fowler"
                        ],
                        "publisher": "Addison-Wesley",
                        "publishedDate": "2018-12-09",
                        "description": "Each refactoring step is simple--seemingly too simple to be worth doing.",
                        "pageCount": 455,
                        "imageLinks": {
                            "thumbnail": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        }
                    }
                }
            ]
        }

        book = ResponseParser('9780133065268', content).extract_book()

        self.assertDictEqual(book, {
            "author": "Martin Fowler",
            "description": "Each refactoring step is simple--seemingly too simple to be worth doing.",
            "image_url": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "isbn": "9780133065268",
            "number_of_pages": 455,
            "publication_date": "2018-12-09",
            "publisher": "Addison-Wesley",
            "subtitle": "Improving the Design of Existing Code the New Way",
            "title": "Refactoring II"
        })

    def test_should_not_raise_exception_when_fields_are_missing(self):
        # content without authors and description
        content = {
            "kind": "books#volumes",
            "totalItems": 2,
            "items": [
                {
                    "volumeInfo": {
                        "title": "Refactoring II",
                        "subtitle": "Improving the Design of Existing Code the New Way",
                        "publisher": "Addison-Wesley",
                        "publishedDate": "2018-12-09",
                        "pageCount": 455,
                        "imageLinks": {
                            "thumbnail": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        }
                    }
                }
            ]
        }

        book = ResponseParser('9780133065268', content).extract_book()

        self.assertDictEqual(book, {
            "author": "",
            "description": "",
            "image_url": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "isbn": "9780133065268",
            "number_of_pages": 455,
            "publication_date": "2018-12-09",
            "publisher": "Addison-Wesley",
            "subtitle": "Improving the Design of Existing Code the New Way",
            "title": "Refactoring II"
        })