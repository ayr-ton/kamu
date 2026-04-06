# Frontend

## Overview

The frontend is server-rendered by Django templates. Dynamic interactions use
HTMX (HTML-over-the-wire) and petite-vue (reactive islands). Styling is done
with Tailwind CSS. There is no JavaScript build step.

## Technology

| Tool       | Version | Purpose                              | Loaded As          |
|------------|---------|--------------------------------------|--------------------|
| HTMX       | 2.x     | Partial page updates, form actions   | Vendored static JS |
| petite-vue | 0.4.x   | Reactive islands (search, theme)     | Vendored static JS |
| Tailwind   | 3.x     | Utility-first CSS                    | Compiled CSS file  |

## No Build Step for JavaScript

- HTMX and petite-vue are small, standalone JS files
- They are vendored into `static/vendor/` and served as static files
- No npm, no webpack, no babel, no transpilation
- The only build step is Tailwind CSS compilation (see `ASSETS.md`)

## Page Architecture

Every page follows this structure:

```html
{% extends "base.html" %}

{% block title %}Page Title{% endblock %}

{% block content %}
  <!-- Full page content here -->
  <!-- HTMX attributes on interactive elements -->
  <!-- petite-vue v-scope on reactive islands -->
{% endblock %}
```

### Base Layout (`core/templates/base.html`)

```html
<!DOCTYPE html>
<html lang="en" :class="{ dark: darkMode }" v-scope="{ darkMode: localStorage.getItem('theme') === 'dark' }">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kamu — {% block title %}{% endblock %}</title>
  {% load static %}
  <link rel="stylesheet" href="{% static 'css/output.css' %}">
  <link rel="shortcut icon" href="{% static 'images/favicon.ico' %}">
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
  {% include "navbar.html" %}

  <main class="container mx-auto px-4 py-8">
    {% block content %}{% endblock %}
  </main>

  <script src="{% static 'vendor/htmx.min.js' %}"></script>
  <script src="{% static 'vendor/petite-vue.es.js' %}"></script>
  <script>PetiteVue.createApp().mount()</script>
</body>
</html>
```

## HTMX Patterns

### Pattern 1: Pagination

```html
<div id="book-list">
  {% include "books/partials/book_list_items.html" %}
</div>
```

The partial includes pagination links with HTMX:

```html
{% if page.has_next %}
<a hx-get="?page={{ page.next_page_number }}&q={{ query }}"
   hx-target="#book-list"
   hx-swap="innerHTML"
   class="...">
  Next
</a>
{% endif %}
```

### Pattern 2: Action Buttons (Borrow / Return / Waitlist)

```html
<div id="book-action-{{ book.pk }}">
  {% include "books/partials/book_action.html" %}
</div>
```

The action partial:

```html
{% if action.type == "BORROW" %}
<button hx-post="{% url 'borrow-book' slug=library.slug pk=book.pk %}"
        hx-target="#book-action-{{ book.pk }}"
        hx-swap="innerHTML"
        class="...">
  Borrow
</button>
{% elif action.type == "RETURN" %}
<button hx-post="{% url 'return-book' slug=library.slug pk=book.pk %}"
        hx-target="#book-action-{{ book.pk }}"
        hx-swap="innerHTML"
        class="...">
  Return
</button>
{% elif action.type == "JOIN_WAITLIST" %}
<button hx-post="{% url 'join-waitlist' slug=library.slug pk=book.pk %}"
        hx-target="#book-action-{{ book.pk }}"
        hx-swap="innerHTML"
        class="...">
  Join Waitlist
</button>
{% elif action.type == "LEAVE_WAITLIST" %}
<button hx-post="{% url 'leave-waitlist' slug=library.slug pk=book.pk %}"
        hx-target="#book-action-{{ book.pk }}"
        hx-swap="innerHTML"
        class="...">
  Leave Waitlist
</button>
{% endif %}
```

### Pattern 3: Search with Debounce

```html
<div v-scope="{ query: '{{ query }}' }">
  <input type="text"
         v-model="query"
         hx-get="{% url 'book-list' slug=library.slug %}"
         hx-trigger="input changed delay:300ms"
         hx-target="#book-list"
         hx-swap="innerHTML"
         hx-include="this"
         name="q"
         placeholder="Search by title, author, or ISBN..."
         class="...">
</div>
```

## petite-vue Patterns

### Theme Toggle

```html
<button @click="darkMode = !darkMode; localStorage.setItem('theme', darkMode ? 'dark' : 'light')"
        class="...">
  <span v-if="darkMode">☀️</span>
  <span v-else>🌙</span>
</button>
```

### Dropdown/Modal

```html
<div v-scope="{ open: false }">
  <button @click="open = !open">Menu</button>
  <div v-show="open" @click.outside="open = false" class="...">
    <!-- dropdown content -->
  </div>
</div>
```

## CSRF Protection

All HTMX POST requests need the CSRF token. Configure HTMX globally:

```html
<body hx-headers='{"X-CSRFToken": "{{ csrf_token }}"}'>
```

## Response Headers

Views return appropriate HTMX response headers when needed:

```python
response = render(request, "books/partials/book_action.html", context)
response["HX-Trigger"] = "bookActionComplete"  # optional event
return response
```

## Page Inventory

| Page            | URL                              | HTMX | petite-vue | Template                     |
|-----------------|----------------------------------|------|------------|------------------------------|
| Library List    | `/`                              | No   | Redirect   | `books/library_list.html`    |
| Book List       | `/libraries/<slug>/`             | Yes  | Search     | `books/book_list.html`       |
| Book Detail     | `/libraries/<slug>/books/<pk>/`  | Yes  | No         | `books/book_detail.html`     |
| My Books        | `/my-books/`                     | No   | No         | `books/my_books.html`        |
| Theme Toggle    | (all pages via base.html)        | No   | Yes        | `navbar.html`                |

## Migration Approach

Pages are migrated one at a time. During migration, both the React SPA and new
Django templates coexist:

1. New Django view URLs are added **above** the React catch-all in `core/urls.py`
2. When a URL matches a new view, Django renders the template
3. When no specific URL matches, the React SPA catch-all still works
4. Once all pages are migrated, the catch-all and React bundle are removed

This allows incremental migration with manual testing at each step.
