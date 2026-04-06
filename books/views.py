from django.contrib import messages, admin
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Exists, OuterRef, Q
from django.http import Http404
from django.shortcuts import render, redirect, get_object_or_404

from django.urls import reverse
from django.utils.http import urlencode
from django.views.generic.base import View

from books.google import BookFinder, lookup_isbn
from books.models import Book, BookCopy, Library
from .forms import IsbnForm
from .models import Book as BookModel


@login_required
def library_list(request):
    last_library = request.COOKIES.get("last_library")
    if last_library and Library.objects.filter(slug=last_library).exists():
        return redirect(f"/libraries/{last_library}/")

    libraries = Library.objects.order_by("name")
    return render(request, "books/library_list.html", {"libraries": libraries})


@login_required
def book_list(request, slug):
    library = get_object_or_404(Library, slug=slug)

    books = Book.objects.filter(bookcopy__library=library).distinct()

    query = request.GET.get("q", "")
    if query:
        books = books.filter(
            Q(title__icontains=query)
            | Q(author__icontains=query)
            | Q(isbn__icontains=query)
        )

    available_copy = BookCopy.objects.filter(
        book=OuterRef("pk"), library=library, user=None, missing=False
    )
    books = books.annotate(is_available=Exists(available_copy)).order_by("title")

    paginator = Paginator(books, 20)
    page = paginator.get_page(request.GET.get("page"))

    context = {"library": library, "page": page, "query": query}

    if request.headers.get("HX-Request"):
        return render(request, "books/partials/book_list_items.html", context)

    response = render(request, "books/book_list.html", context)
    response.set_cookie("last_library", slug, max_age=365 * 24 * 60 * 60)
    return response


@login_required
def book_detail(request, slug, pk):
    library = get_object_or_404(Library, slug=slug)
    book = get_object_or_404(Book, pk=pk)
    if not book.bookcopy_set.filter(library=library).exists():
        raise Http404

    copies = book.bookcopy_set.filter(library=library).select_related("user")
    action = book.available_action(request.user, library)

    context = {
        "library": library,
        "book": book,
        "copies": copies,
        "action": action,
    }
    return render(request, "books/book_detail.html", context)


def _book_action_context(book, user, library):
    copies = book.bookcopy_set.filter(library=library).select_related("user")
    action = book.available_action(user, library)
    return {"library": library, "book": book, "copies": copies, "action": action}


@login_required
def borrow_book(request, slug, pk):
    if request.method != "POST":
        return redirect("book-detail", slug=slug, pk=pk)
    library = get_object_or_404(Library, slug=slug)
    book = get_object_or_404(Book, pk=pk)
    try:
        book.borrow(user=request.user, library=library)
    except ValueError:
        pass
    context = _book_action_context(book, request.user, library)
    if request.headers.get("HX-Request"):
        return render(request, "books/partials/book_action.html", context)
    return redirect("book-detail", slug=slug, pk=pk)


@login_required
def return_book(request, slug, pk):
    if request.method != "POST":
        return redirect("book-detail", slug=slug, pk=pk)
    library = get_object_or_404(Library, slug=slug)
    book = get_object_or_404(Book, pk=pk)
    try:
        book.return_to_library(user=request.user, library=library)
    except ValueError:
        pass
    context = _book_action_context(book, request.user, library)
    if request.headers.get("HX-Request"):
        return render(request, "books/partials/book_action.html", context)
    return redirect("book-detail", slug=slug, pk=pk)


@login_required
def join_waitlist(request, slug, pk):
    if request.method != "POST":
        return redirect("book-detail", slug=slug, pk=pk)
    library = get_object_or_404(Library, slug=slug)
    book = get_object_or_404(Book, pk=pk)
    from waitlist.models import WaitlistItem
    try:
        WaitlistItem.create_item(book=book, library=library, user=request.user)
    except (ValueError, Exception):
        pass
    context = _book_action_context(book, request.user, library)
    if request.headers.get("HX-Request"):
        return render(request, "books/partials/book_action.html", context)
    return redirect("book-detail", slug=slug, pk=pk)


@login_required
def leave_waitlist(request, slug, pk):
    if request.method != "POST":
        return redirect("book-detail", slug=slug, pk=pk)
    library = get_object_or_404(Library, slug=slug)
    book = get_object_or_404(Book, pk=pk)
    book.waitlistitem_set.filter(user=request.user, library=library).delete()
    context = _book_action_context(book, request.user, library)
    if request.headers.get("HX-Request"):
        return render(request, "books/partials/book_action.html", context)
    return redirect("book-detail", slug=slug, pk=pk)


@login_required
def my_books(request):
    borrowed_copies = BookCopy.objects.filter(
        user=request.user
    ).select_related("book", "library")
    from waitlist.models import WaitlistItem
    waitlist_items = WaitlistItem.objects.filter(
        user=request.user
    ).select_related("book", "library")
    context = {
        "borrowed_copies": borrowed_copies,
        "waitlist_items": waitlist_items,
    }
    return render(request, "books/my_books.html", context)


@login_required
def add_book(request, slug):
    library = get_object_or_404(Library, slug=slug)
    return render(request, "books/add_book.html", {"library": library})


@login_required
def isbn_lookup(request, slug):
    library = get_object_or_404(Library, slug=slug)
    isbn = request.POST.get("isbn", "").strip()

    if not isbn:
        return render(request, "books/partials/book_preview.html", {
            "library": library, "error": "Please enter an ISBN.",
        })

    existing = Book.objects.filter(isbn=isbn).first()
    already_in_library = (
        existing and BookCopy.objects.filter(book=existing, library=library).exists()
    )

    result = lookup_isbn(isbn)
    if not result:
        return render(request, "books/partials/book_preview.html", {
            "library": library, "error": "No book found for that ISBN.",
        })

    return render(request, "books/partials/book_preview.html", {
        "library": library,
        "book_data": result,
        "already_in_library": already_in_library,
    })


@login_required
def add_book_confirm(request, slug):
    library = get_object_or_404(Library, slug=slug)
    isbn = request.POST.get("isbn", "").strip()

    if not isbn:
        return redirect("add-book", slug=slug)

    result = lookup_isbn(isbn)
    if not result:
        messages.warning(request, "Could not find book. Please try again.")
        return redirect("add-book", slug=slug)

    book = Book.objects.filter(isbn=isbn).first()
    if not book:
        pub_date = result.get("publication_date", "")
        try:
            from django.utils.dateparse import parse_date
            parsed_date = parse_date(pub_date)
        except (ValueError, TypeError):
            parsed_date = None

        pages = result.get("number_of_pages", "")
        try:
            pages = int(pages)
        except (ValueError, TypeError):
            pages = None

        book = Book.objects.create(
            isbn=isbn,
            title=result.get("title", ""),
            subtitle=result.get("subtitle", ""),
            author=result.get("author", ""),
            publisher=result.get("publisher", ""),
            description=result.get("description", ""),
            publication_date=parsed_date,
            number_of_pages=pages,
            image_url=result.get("image_url", ""),
        )

    if not BookCopy.objects.filter(book=book, library=library).exists():
        BookCopy.objects.create(book=book, library=library)

    return redirect("book-detail", slug=slug, pk=book.pk)


class IsbnFormView(View):
    def get(self, request):
        form = IsbnForm()

        return render(request, 'isbn.html', {
            'form': form,
            'site_header': admin.site.site_header,
            'books_isbn_url': reverse('admin:books_book_isbn')
        })

    def post(self, request):
        form = IsbnForm(request.POST)
        if form.is_valid():
            isbn = form.cleaned_data["isbn"]
            book_from_db = BookModel.objects.filter(isbn=isbn).distinct()
            book = BookFinder.fetch(isbn)

            if book_from_db:
                messages.warning(request, 'The requested book is on the table.')
                return self.get(request)

            if book == {}:
                messages.warning(request, 'Sorry! We could not find the book with the ISBN provided.')
            else:
                messages.info(request, "Found! Go ahead, modify book template and save.")

            return redirect('{}?{}'.format(reverse('admin:books_book_add'), urlencode(book)))
        else:
            messages.error(request, 'Invalid ISBN provided!')

            return self.get(request)
