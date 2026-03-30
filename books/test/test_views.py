import json
import os

import httpretty
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from unittest.mock import patch

from books.models import Book, Library, BookCopy


class IsbnViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia", is_staff=True, is_superuser=True)
        self.user.set_password("pwd12345")
        self.user.save()
        self.client.force_login(user=self.user)

        self.url = '/admin/books/book/isbn/'

    def test_get_should_render_isbn_template(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)

        self.assertTemplateUsed(response, 'isbn.html')
        self.assertTemplateUsed(response, 'admin/app_index.html')

    def test_post_should_render_isbn_form_when_input_is_not_provided(self):
        response = self.client.post(self.url)

        self.assertTemplateUsed(response, 'isbn.html')
        self.assertTemplateUsed(response, 'admin/app_index.html')
        self.assertContains(response, 'Invalid ISBN provided!')

    @httpretty.activate
    def test_post_should_show_failure_message_on_book_add_form_when_isbn_is_not_found(self):
        httpretty.register_uri(
            httpretty.GET,
            "https://www.googleapis.com/books/v1/volumes?q=isbn:9780133065268",
            body='{"kind": "books#volumes", "totalItems": 0}',
            status=200)

        response = self.client.post(self.url, data={'isbn': '9780133065268'}, follow=True)

        self.assertRedirects(response, '/admin/books/book/add/?', status_code=302, target_status_code=200)
        self.assertContains(response, 'Sorry! We could not find the book with the ISBN provided.')
        self.assertTemplateUsed(response, 'admin/change_form.html')

    @httpretty.activate
    def test_post_should_show_success_message_on_book_add_form_when_isbn_is_found(self):
        content = {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "volumeInfo": {
                        "title": "Refactoring",
                        "subtitle": "Improving the Design of Existing Code",
                        "authors": [
                            "Martin Fowler"
                        ],
                        "publisher": "Addison-Wesley",
                        "publishedDate": "2012-03-09",
                        "description": "As the application of object technology--particularly bla bla bla",
                        "pageCount": 455,
                        "imageLinks": {
                            "thumbnail": "http://books.google.com/books/content?id=HmrDHwgkbPsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        }
                    }
                }
            ]
        }

        httpretty.register_uri(
            httpretty.GET,
            "https://www.googleapis.com/books/v1/volumes?q=isbn:9780133065268",
            body=json.dumps(content),
            status=200)

        response = self.client.post(self.url, data={'isbn': '9780133065268'}, follow=True)

        self.assertRedirects(response, '/admin/books/book/add/?isbn=9780133065268&author=Martin+Fowler&description=As'
                                       '+the+application+of+object+technology--particularly+bla+bla+bla&image_url'
                                       '=http%3A%2F%2Fbooks.google.com%2Fbooks%2Fcontent%3Fid%3DHmrDHwgkbPsC'
                                       '%26printsec%3Dfrontcover%26img%3D1%26zoom%3D1%26edge%3Dcurl%26source'
                                       '%3Dgbs_api&number_of_pages=455&publication_date=2012-03-09&publisher=Addison'
                                       '-Wesley&subtitle=Improving+the+Design+of+Existing+Code&title=Refactoring',
                             status_code=302, target_status_code=200)
        self.assertContains(response, 'Found! Go ahead, modify book template and save.')
        self.assertTemplateUsed(response, 'admin/change_form.html')


class BookDetailViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(self.user)

        self.library = Library.objects.create(name="Quito", slug="quito")
        self.book = Book.objects.create(
            author="Martin Fowler", title="Refactoring",
            subtitle="Improving the Design of Existing Code",
            description="A great book about refactoring.",
            isbn="9780201485677", publisher="Addison-Wesley",
            publication_date=timezone.now(), number_of_pages=455,
            image_url="http://example.com/cover.jpg",
        )
        self.copy = BookCopy.objects.create(book=self.book, library=self.library)
        self.url = f"/libraries/quito/books/{self.book.pk}/"

    def test_book_detail_returns_200(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_book_detail_requires_login(self):
        self.client.logout()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 302)

    def test_book_detail_uses_correct_template(self):
        response = self.client.get(self.url)
        self.assertTemplateUsed(response, "books/book_detail.html")

    def test_book_detail_shows_book_info(self):
        response = self.client.get(self.url)
        self.assertContains(response, "Refactoring")
        self.assertContains(response, "Martin Fowler")
        self.assertContains(response, "Improving the Design of Existing Code")
        self.assertContains(response, "A great book about refactoring.")
        self.assertContains(response, "9780201485677")
        self.assertContains(response, "Addison-Wesley")
        self.assertContains(response, "455 pages")

    def test_book_detail_shows_availability(self):
        response = self.client.get(self.url)
        self.assertContains(response, "Available")

    def test_book_detail_shows_action_button(self):
        response = self.client.get(self.url)
        self.assertContains(response, "Borrow")

    def test_book_detail_returns_404_for_book_not_in_library(self):
        other_library = Library.objects.create(name="Santiago", slug="santiago")
        url = f"/libraries/santiago/books/{self.book.pk}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_book_detail_shows_borrowed_status(self):
        self.copy.user = self.user
        self.copy.borrow_date = timezone.now()
        self.copy.save()
        response = self.client.get(self.url)
        self.assertContains(response, "Borrowed by claudia")

    def test_book_detail_shows_goodreads_link(self):
        response = self.client.get(self.url)
        self.assertContains(response, "goodreads.com/search?q=9780201485677")


class BorrowReturnViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(self.user)

        self.library = Library.objects.create(name="Quito", slug="quito")
        self.book = Book.objects.create(author="Author", title="A Book")
        self.copy = BookCopy.objects.create(book=self.book, library=self.library)
        self.borrow_url = f"/libraries/quito/books/{self.book.pk}/borrow/"
        self.return_url = f"/libraries/quito/books/{self.book.pk}/return/"

    def test_borrow_book_post_borrows_copy(self):
        response = self.client.post(self.borrow_url)
        self.copy.refresh_from_db()
        self.assertEqual(self.copy.user, self.user)

    def test_borrow_returns_updated_action_fragment_for_htmx(self):
        response = self.client.post(self.borrow_url, HTTP_HX_REQUEST="true")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Return")
        self.assertTemplateUsed(response, "books/partials/book_action.html")

    def test_borrow_redirects_for_non_htmx(self):
        response = self.client.post(self.borrow_url)
        self.assertEqual(response.status_code, 302)

    @patch('books.models.run_async_task')
    def test_return_book_post_returns_copy(self, _):
        self.copy.user = self.user
        self.copy.borrow_date = timezone.now()
        self.copy.save()
        response = self.client.post(self.return_url)
        self.copy.refresh_from_db()
        self.assertIsNone(self.copy.user)

    @patch('books.models.run_async_task')
    def test_return_returns_updated_action_fragment_for_htmx(self, _):
        self.copy.user = self.user
        self.copy.borrow_date = timezone.now()
        self.copy.save()
        response = self.client.post(self.return_url, HTTP_HX_REQUEST="true")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Borrow")
        self.assertTemplateUsed(response, "books/partials/book_action.html")


class WaitlistViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(self.user)

        self.library = Library.objects.create(name="Quito", slug="quito")
        self.book = Book.objects.create(author="Author", title="A Book")
        self.borrower = User.objects.create_user(username="borrower")
        self.copy = BookCopy.objects.create(
            book=self.book, library=self.library,
            user=self.borrower, borrow_date=timezone.now(),
        )
        self.join_url = f"/libraries/quito/books/{self.book.pk}/waitlist/join/"
        self.leave_url = f"/libraries/quito/books/{self.book.pk}/waitlist/leave/"

    @patch('waitlist.models.run_async_task')
    def test_join_waitlist_creates_item(self, _):
        response = self.client.post(self.join_url)
        self.assertTrue(
            self.book.waitlistitem_set.filter(user=self.user, library=self.library).exists()
        )

    @patch('waitlist.models.run_async_task')
    def test_join_waitlist_returns_updated_button(self, _):
        response = self.client.post(self.join_url, HTTP_HX_REQUEST="true")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Leave Waitlist")

    def test_leave_waitlist_removes_item(self):
        self.book.waitlistitem_set.create(
            user=self.user, library=self.library, added_date=timezone.now()
        )
        response = self.client.post(self.leave_url)
        self.assertFalse(
            self.book.waitlistitem_set.filter(user=self.user, library=self.library).exists()
        )

    def test_leave_waitlist_returns_updated_button(self):
        self.book.waitlistitem_set.create(
            user=self.user, library=self.library, added_date=timezone.now()
        )
        response = self.client.post(self.leave_url, HTTP_HX_REQUEST="true")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Join Waitlist")


class MyBooksViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(self.user)

        self.library = Library.objects.create(name="Quito", slug="quito")

    def test_my_books_returns_200(self):
        response = self.client.get("/my-books/")
        self.assertEqual(response.status_code, 200)

    def test_my_books_requires_login(self):
        self.client.logout()
        response = self.client.get("/my-books/")
        self.assertEqual(response.status_code, 302)

    def test_my_books_uses_correct_template(self):
        response = self.client.get("/my-books/")
        self.assertTemplateUsed(response, "books/my_books.html")

    def test_my_books_shows_borrowed_books(self):
        book = Book.objects.create(author="Author", title="Borrowed Book")
        BookCopy.objects.create(
            book=book, library=self.library,
            user=self.user, borrow_date=timezone.now(),
        )
        response = self.client.get("/my-books/")
        self.assertContains(response, "Borrowed Book")

    def test_my_books_shows_waitlist(self):
        book = Book.objects.create(author="Author", title="Waitlisted Book")
        BookCopy.objects.create(book=book, library=self.library)
        book.waitlistitem_set.create(
            user=self.user, library=self.library, added_date=timezone.now()
        )
        response = self.client.get("/my-books/")
        self.assertContains(response, "Waitlisted Book")

    def test_my_books_does_not_show_other_users_books(self):
        other_user = User.objects.create_user(username="other")
        book = Book.objects.create(author="Author", title="Others Book")
        BookCopy.objects.create(
            book=book, library=self.library,
            user=other_user, borrow_date=timezone.now(),
        )
        response = self.client.get("/my-books/")
        self.assertNotContains(response, "Others Book")


class AddBookViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.client.force_login(self.user)
        self.library = Library.objects.create(name="Quito", slug="quito")

    def test_add_book_page_returns_200(self):
        response = self.client.get("/libraries/quito/add-book/")
        self.assertEqual(response.status_code, 200)

    def test_add_book_requires_login(self):
        self.client.logout()
        response = self.client.get("/libraries/quito/add-book/")
        self.assertEqual(response.status_code, 302)

    def test_add_book_uses_correct_template(self):
        response = self.client.get("/libraries/quito/add-book/")
        self.assertTemplateUsed(response, "books/add_book.html")

    def test_add_book_returns_404_for_invalid_library(self):
        response = self.client.get("/libraries/nonexistent/add-book/")
        self.assertEqual(response.status_code, 404)

    def test_add_book_shows_library_name(self):
        response = self.client.get("/libraries/quito/add-book/")
        self.assertContains(response, "Quito")

    @patch("books.views.lookup_isbn")
    def test_isbn_lookup_returns_book_preview(self, mock_lookup):
        mock_lookup.return_value = {
            "isbn": "9780201633610",
            "title": "Design Patterns",
            "subtitle": "",
            "author": "Erich Gamma",
            "publisher": "Addison-Wesley",
            "description": "A classic.",
            "publication_date": "1994",
            "number_of_pages": 395,
            "image_url": "http://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
        }
        response = self.client.post(
            "/libraries/quito/add-book/lookup/",
            {"isbn": "9780201633610"},
            HTTP_HX_REQUEST="true",
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Design Patterns")
        self.assertContains(response, "Erich Gamma")
        self.assertTemplateUsed(response, "books/partials/book_preview.html")

    @patch("books.views.lookup_isbn")
    def test_isbn_lookup_shows_not_found_message(self, mock_lookup):
        mock_lookup.return_value = {}
        response = self.client.post(
            "/libraries/quito/add-book/lookup/",
            {"isbn": "0000000000000"},
            HTTP_HX_REQUEST="true",
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No book found")

    @patch("books.views.lookup_isbn")
    def test_isbn_lookup_warns_if_book_already_in_library(self, mock_lookup):
        book = Book.objects.create(
            title="Existing Book", author="Author", isbn="9780201633610"
        )
        BookCopy.objects.create(book=book, library=self.library)
        mock_lookup.return_value = {
            "isbn": "9780201633610", "title": "Existing Book",
            "author": "Author", "publisher": "", "subtitle": "",
            "description": "", "publication_date": "", "number_of_pages": "",
            "image_url": "",
        }
        response = self.client.post(
            "/libraries/quito/add-book/lookup/",
            {"isbn": "9780201633610"},
            HTTP_HX_REQUEST="true",
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "already")

    @patch("books.views.lookup_isbn")
    def test_add_book_confirm_creates_book_and_copy(self, mock_lookup):
        mock_lookup.return_value = {
            "isbn": "9780201633610", "title": "Design Patterns",
            "subtitle": "", "author": "Erich Gamma",
            "publisher": "Addison-Wesley", "description": "A classic.",
            "publication_date": "", "number_of_pages": 395,
            "image_url": "http://example.com/cover.jpg",
        }
        response = self.client.post("/libraries/quito/add-book/confirm/", {
            "isbn": "9780201633610",
        })
        self.assertTrue(Book.objects.filter(isbn="9780201633610").exists())
        book = Book.objects.get(isbn="9780201633610")
        self.assertTrue(BookCopy.objects.filter(book=book, library=self.library).exists())
        self.assertEqual(book.title, "Design Patterns")

    @patch("books.views.lookup_isbn")
    def test_add_book_confirm_redirects_to_book_detail(self, mock_lookup):
        mock_lookup.return_value = {
            "isbn": "9780201633610", "title": "Design Patterns",
            "subtitle": "", "author": "Erich Gamma",
            "publisher": "Addison-Wesley", "description": "",
            "publication_date": "", "number_of_pages": "",
            "image_url": "",
        }
        response = self.client.post("/libraries/quito/add-book/confirm/", {
            "isbn": "9780201633610",
        })
        book = Book.objects.get(isbn="9780201633610")
        self.assertRedirects(
            response,
            f"/libraries/quito/books/{book.pk}/",
            fetch_redirect_response=False,
        )

    @patch("books.views.lookup_isbn")
    def test_add_book_confirm_creates_only_copy_for_existing_book(self, mock_lookup):
        existing = Book.objects.create(
            title="Design Patterns", author="Erich Gamma", isbn="9780201633610"
        )
        mock_lookup.return_value = {
            "isbn": "9780201633610", "title": "Design Patterns",
            "subtitle": "", "author": "Erich Gamma",
            "publisher": "Addison-Wesley", "description": "",
            "publication_date": "", "number_of_pages": "",
            "image_url": "",
        }
        response = self.client.post("/libraries/quito/add-book/confirm/", {
            "isbn": "9780201633610",
        })
        self.assertEqual(Book.objects.filter(isbn="9780201633610").count(), 1)
        self.assertTrue(
            BookCopy.objects.filter(book=existing, library=self.library).exists()
        )

    @patch("books.views.lookup_isbn")
    def test_add_book_confirm_fails_when_isbn_not_found(self, mock_lookup):
        mock_lookup.return_value = {}
        response = self.client.post("/libraries/quito/add-book/confirm/", {
            "isbn": "0000000000000",
        })
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Book.objects.filter(isbn="0000000000000").exists())


class BookListViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()
        self.client.force_login(self.user)

        self.library = Library.objects.create(name="Quito", slug="quito")
        self.book = Book.objects.create(
            author="Martin Fowler", title="Refactoring",
            image_url="http://example.com/cover.jpg",
        )
        BookCopy.objects.create(book=self.book, library=self.library)

    def test_book_list_requires_login(self):
        self.client.logout()
        response = self.client.get("/libraries/quito/")
        self.assertEqual(response.status_code, 302)
        self.assertIn("login", response.url)

    def test_book_list_returns_200(self):
        response = self.client.get("/libraries/quito/")
        self.assertEqual(response.status_code, 200)

    def test_book_list_returns_404_for_invalid_library(self):
        response = self.client.get("/libraries/nonexistent/")
        self.assertEqual(response.status_code, 404)

    def test_book_list_uses_correct_template(self):
        response = self.client.get("/libraries/quito/")
        self.assertTemplateUsed(response, "books/book_list.html")

    def test_book_list_shows_books_for_library(self):
        response = self.client.get("/libraries/quito/")
        self.assertContains(response, "Refactoring")
        self.assertContains(response, "Martin Fowler")

    def test_book_list_does_not_show_books_from_other_libraries(self):
        other_library = Library.objects.create(name="Santiago", slug="santiago")
        other_book = Book.objects.create(author="Other Author", title="Other Book")
        BookCopy.objects.create(book=other_book, library=other_library)

        response = self.client.get("/libraries/quito/")
        self.assertContains(response, "Refactoring")
        self.assertNotContains(response, "Other Book")

    def test_book_list_shows_availability_for_available_book(self):
        response = self.client.get("/libraries/quito/")
        self.assertContains(response, "Available")

    def test_book_list_shows_borrowed_status(self):
        borrower = User.objects.create_user(username="borrower")
        copy = BookCopy.objects.get(book=self.book, library=self.library)
        copy.user = borrower
        copy.borrow_date = timezone.now()
        copy.save()

        response = self.client.get("/libraries/quito/")
        self.assertContains(response, "Borrowed")

    def test_book_list_paginates_results(self):
        for i in range(25):
            book = Book.objects.create(author="Author", title=f"Book {i:02d}")
            BookCopy.objects.create(book=book, library=self.library)

        response = self.client.get("/libraries/quito/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "page=2")

    def test_book_list_second_page(self):
        for i in range(25):
            book = Book.objects.create(author="Author", title=f"Book {i:02d}")
            BookCopy.objects.create(book=book, library=self.library)

        response = self.client.get("/libraries/quito/?page=2")
        self.assertEqual(response.status_code, 200)

    def test_book_list_htmx_returns_fragment(self):
        response = self.client.get(
            "/libraries/quito/",
            HTTP_HX_REQUEST="true",
        )
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "books/partials/book_list_items.html")
        self.assertTemplateNotUsed(response, "base.html")

    def test_book_list_search_filters_by_title(self):
        book2 = Book.objects.create(author="Kent Beck", title="TDD by Example")
        BookCopy.objects.create(book=book2, library=self.library)

        response = self.client.get("/libraries/quito/?q=Refactoring")
        self.assertContains(response, "Refactoring")
        self.assertNotContains(response, "TDD by Example")

    def test_book_list_search_filters_by_author(self):
        book2 = Book.objects.create(author="Kent Beck", title="TDD by Example")
        BookCopy.objects.create(book=book2, library=self.library)

        response = self.client.get("/libraries/quito/?q=Kent")
        self.assertContains(response, "TDD by Example")
        self.assertNotContains(response, "Refactoring")

    def test_book_list_search_filters_by_isbn(self):
        self.book.isbn = "9780201485677"
        self.book.save()
        book2 = Book.objects.create(author="Kent Beck", title="TDD by Example")
        BookCopy.objects.create(book=book2, library=self.library)

        response = self.client.get("/libraries/quito/?q=9780201485677")
        self.assertContains(response, "Refactoring")
        self.assertNotContains(response, "TDD by Example")

    def test_book_list_empty_search_shows_all(self):
        book2 = Book.objects.create(author="Kent Beck", title="TDD by Example")
        BookCopy.objects.create(book=book2, library=self.library)

        response = self.client.get("/libraries/quito/?q=")
        self.assertContains(response, "Refactoring")
        self.assertContains(response, "TDD by Example")

    def test_book_list_sets_last_library_cookie(self):
        response = self.client.get("/libraries/quito/")
        self.assertEqual(response.cookies["last_library"].value, "quito")

    def test_book_list_shows_library_name(self):
        response = self.client.get("/libraries/quito/")
        self.assertContains(response, "Quito")


class LibraryListViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="claudia")
        self.user.set_password("123")
        self.user.save()

    def test_library_list_requires_login(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 302)
        self.assertIn("login", response.url)

    def test_library_list_returns_200(self):
        self.client.force_login(self.user)
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_library_list_uses_correct_template(self):
        self.client.force_login(self.user)
        response = self.client.get("/")
        self.assertTemplateUsed(response, "books/library_list.html")

    def test_library_list_shows_all_libraries(self):
        self.client.force_login(self.user)
        Library.objects.create(name="Quito", slug="quito")
        Library.objects.create(name="Santiago", slug="santiago")
        response = self.client.get("/")
        self.assertContains(response, "Quito")
        self.assertContains(response, "Santiago")

    def test_library_list_links_to_book_listing(self):
        self.client.force_login(self.user)
        Library.objects.create(name="Quito", slug="quito")
        response = self.client.get("/")
        self.assertContains(response, '/libraries/quito/')

    def test_library_list_shows_libraries_ordered_by_name(self):
        self.client.force_login(self.user)
        Library.objects.create(name="Zurich", slug="zurich")
        Library.objects.create(name="Atlanta", slug="atlanta")
        response = self.client.get("/")
        content = response.content.decode()
        self.assertLess(content.index("Atlanta"), content.index("Zurich"))

    def test_library_list_redirects_to_last_visited(self):
        self.client.force_login(self.user)
        Library.objects.create(name="Quito", slug="quito")
        self.client.cookies["last_library"] = "quito"
        response = self.client.get("/")
        self.assertRedirects(response, "/libraries/quito/", fetch_redirect_response=False)

    def test_library_list_ignores_invalid_last_visited_cookie(self):
        self.client.force_login(self.user)
        Library.objects.create(name="Quito", slug="quito")
        self.client.cookies["last_library"] = "nonexistent"
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Quito")


