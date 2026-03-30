# Django Structure

## Target Project Layout

```
kamu/
├── core/
│   ├── __init__.py              # Package init
│   ├── urls.py                  # Root URL routing
│   ├── wsgi.py                  # WSGI application
│   ├── feature_toggles.py       # Feature toggle utilities
│   ├── context_processors.py    # Template context (theme, analytics)
│   ├── settings/
│   │   ├── common.py            # Shared settings
│   │   ├── dev.py               # Development (DEBUG=True, Podman Postgres)
│   │   ├── test.py              # Test settings
│   │   ├── prod.py              # Production settings
│   │   └── cron.py              # Cron job settings
│   ├── templates/
│   │   ├── base.html            # Base layout (Tailwind, HTMX, petite-vue)
│   │   ├── navbar.html          # Shared navigation partial
│   │   └── rest_framework/      # (Removed in Phase 3)
│   └── test/
│       └── test_feature_toggles.py
│
├── books/
│   ├── models.py                # Book, Library, BookCopy (unchanged)
│   ├── views.py                 # Django views (replaces DRF viewsets)
│   ├── urls.py                  # App-level URL patterns (new)
│   ├── forms.py                 # IsbnForm (exists)
│   ├── admin.py                 # Admin config (exists)
│   ├── google.py                # Google Books API (exists)
│   ├── management/
│   │   └── commands/
│   │       └── send_overdue_reminders.py  # Overdue reminders (scheduler)
│   ├── cron/
│   │   └── send_notification.py # Overdue email helpers (used by command)
│   ├── templates/
│   │   └── books/
│   │       ├── library_list.html
│   │       ├── book_list.html
│   │       ├── book_detail.html
│   │       ├── my_books.html
│   │       ├── isbn.html             # (exists)
│   │       └── partials/
│   │           ├── book_list_items.html   # HTMX fragment: book grid
│   │           ├── book_card.html         # Single book card
│   │           ├── book_action.html       # Borrow/return/waitlist button
│   │           ├── book_detail_info.html  # Book detail content
│   │           └── pagination.html        # Pagination controls
│   ├── templatetags/
│   │   └── book_tags.py         # Custom template tags (if needed)
│   └── test/
│       ├── test_models.py       # (exists)
│       ├── test_views.py        # Rewritten for new views
│       ├── test_forms.py        # (exists)
│       ├── test_google.py       # (exists)
│       └── test_notifications.py # (exists)
│
├── waitlist/
│   ├── models.py                # WaitlistItem, Waitlist (unchanged)
│   ├── views.py                 # Django views (replaces DRF viewset)
│   ├── urls.py                  # App-level URL patterns (new)
│   ├── admin.py                 # (exists)
│   ├── tasks.py                 # Email notification functions (feature toggle)
│   ├── templates/
│   │   └── waitlist/
│   │       └── partials/
│   │           └── waitlist_status.html  # Waitlist indicator fragment
│   └── test/
│       ├── test_models.py       # (exists)
│       ├── test_views.py        # Rewritten for new views
│       └── test_tasks.py        # Updated for feature toggle
│
├── static/
│   ├── css/
│   │   ├── input.css            # Tailwind source (directives)
│   │   └── output.css           # Tailwind compiled (generated, gitignored)
│   ├── vendor/
│   │   ├── htmx.min.js          # Vendored HTMX
│   │   └── petite-vue.es.js     # Vendored petite-vue
│   └── images/
│       ├── logo.svg
│       ├── logo-dark.svg
│       └── favicon.ico
│
├── docs/                        # All specification documents
├── .github/
│   └── workflows/
│       ├── cicd.yml              # Orchestrates test + deploys
│       ├── test.yml              # Tests (reusable + manual dispatch)
│       ├── deploy-dev.yml        # Staging deploy
│       └── deploy-prod.yml       # Production deploy
├── Containerfile                # Podman container definition (was Dockerfile)
├── podman-compose.yml           # Development services
├── Makefile                     # Development commands
├── pyproject.toml               # Python dependencies
├── tailwind.config.js           # Tailwind CSS configuration
└── manage.py
```

## URL Structure (Target)

```python
# core/urls.py
urlpatterns = [
    # Authentication
    path("accounts/login/", ...),           # Django or Okta login
    path("okta-login/", ...),               # Okta SAML2 (if configured)

    # Admin
    path("admin/", admin.site.urls),

    # Application views
    path("", views.library_list, name="library-list"),
    path("libraries/<slug:slug>/", include("books.urls")),
    path("my-books/", views.my_books, name="my-books"),

    # Static
    path("favicon.ico", ...),
]

# books/urls.py
urlpatterns = [
    path("", views.book_list, name="book-list"),
    path("books/<int:pk>/", views.book_detail, name="book-detail"),
    path("books/<int:pk>/borrow/", views.borrow_book, name="borrow-book"),
    path("books/<int:pk>/return/", views.return_book, name="return-book"),
    path("books/<int:pk>/waitlist/join/", views.join_waitlist, name="join-waitlist"),
    path("books/<int:pk>/waitlist/leave/", views.leave_waitlist, name="leave-waitlist"),
]
```

## View Pattern

Views detect HTMX requests and return either a full page or an HTML fragment:

```python
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required

@login_required
def book_list(request, slug):
    library = get_object_or_404(Library, slug=slug)
    books = Book.objects.filter(bookcopy__library=library).distinct()

    # Search
    query = request.GET.get("q", "")
    if query:
        books = books.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(isbn__icontains=query)
        )

    # Pagination
    paginator = Paginator(books.order_by("title"), 20)
    page = paginator.get_page(request.GET.get("page"))

    context = {"library": library, "page": page, "query": query}

    if request.headers.get("HX-Request"):
        return render(request, "books/partials/book_list_items.html", context)
    return render(request, "books/book_list.html", context)
```

## Feature Toggle Implementation

```python
# core/feature_toggles.py
from django.conf import settings

def is_async_tasks_enabled():
    return getattr(settings, "KAMU_ENABLE_ASYNC_TASKS", False)

def run_async_task(func, *args, **kwargs):
    """Call func synchronously only if notifications are enabled."""
    if is_async_tasks_enabled():
        func(*args, **kwargs)
```

Usage in `waitlist/tasks.py` and model methods:

```python
from core.feature_toggles import run_async_task
from waitlist.tasks import send_waitlist_book_available_notification

run_async_task(send_waitlist_book_available_notification, copy_pk)
```

## Settings Changes

```python
# core/settings/common.py additions
KAMU_ENABLE_ASYNC_TASKS = config("KAMU_ENABLE_ASYNC_TASKS", default=False, cast=bool)

# Remove after Phase 3:
# - REST_FRAMEWORK config
# - WEBPACK_LOADER config

# Add:
TEMPLATES[0]["OPTIONS"]["context_processors"].append(
    "core.context_processors.global_context"
)
```

## Migration Strategy

### Models: No changes
The existing `Book`, `Library`, `BookCopy`, and `WaitlistItem` models remain
unchanged. Business logic in model methods is preserved.

### Views: Replace, don't modify
DRF viewsets are replaced with standard Django views. Old view code is removed
after the new views are tested and verified.

### Templates: New files
All templates are new. The only existing template kept (with modifications) is
`books/templates/isbn.html` for admin ISBN lookup.

### Tests: Rewrite view tests
Model tests remain unchanged. View tests are rewritten to test Django template
responses instead of JSON API responses. Test count should increase (testing
both full-page and HTMX-fragment responses).
