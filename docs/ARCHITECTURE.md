# Architecture

## Overview

Kamu is a physical library management application. Users browse libraries, borrow/return
books, and join waitlists. Admins manage books, libraries, and copies.

The application is being modernized from a React SPA + Django REST Framework architecture
to a server-rendered Django application using HTMX, petite-vue, and Tailwind CSS.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐│
│  │   HTMX   │  │petite-vue│  │   Tailwind CSS (built) ││
│  └────┬─────┘  └────┬─────┘  └────────────────────────┘│
│       │              │                                   │
│       │  HTML fragments / full pages                     │
└───────┼──────────────┼───────────────────────────────────┘
        │              │
        ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                   Django 5.0                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │              URL Router (core/urls.py)            │   │
│  └──────────┬───────────────────────────┬───────────┘   │
│             ▼                           ▼               │
│  ┌─────────────────┐        ┌──────────────────────┐    │
│  │   Django Views   │        │    Admin (built-in)  │    │
│  │  (HTML responses │        │  + ISBN lookup form  │    │
│  │  + HTMX partials)│        └──────────────────────┘    │
│  └────────┬────────┘                                    │
│           ▼                                             │
│  ┌─────────────────┐  ┌──────────────────────────────┐  │
│  │  Django Models   │  │  Email notifications         │  │
│  │  Book, Library,  │  │  (toggle; synchronous calls) │  │
│  │  BookCopy,       │  │  Overdue: send_overdue_      │  │
│  │  WaitlistItem    │  │  reminders command           │  │
│  └────────┬────────┘  └──────────────────────────────┘  │
│           ▼                                             │
│  ┌─────────────┐                                         │
│  │ PostgreSQL  │                                         │
│  └─────────────┘                                         │
└─────────────────────────────────────────────────────────┘
```

## Key Principles

### Server-First Rendering
All pages are rendered server-side by Django templates. HTMX handles dynamic
interactions (borrow, return, search, pagination) by swapping HTML fragments
without full page reloads. No JSON API layer exists.

### Progressive Enhancement
- Base experience works without JavaScript
- HTMX adds seamless partial-page updates
- petite-vue adds lightweight reactivity where needed (theme toggle, search input)
- No webpack, no transpilation, no JS build step

### Feature Toggles
Email notifications are gated by `KAMU_ENABLE_ASYNC_TASKS` (default: `False`). When
disabled, notification code paths are no-ops. When enabled, waitlist and related
emails run synchronously in the request lifecycle (no queue). Scheduled overdue
reminders use the `send_overdue_reminders` management command (for example Cloud
Scheduler + Cloud Run Jobs), which also respects the same toggle.

### Container-First Development
Local development uses Podman and podman-compose exclusively. No Docker or
docker-compose references exist in the project.

## Application Layers

### Templates Layer
Django templates with HTMX attributes and petite-vue directives. Templates are
organized by app (`books/templates/books/`, `waitlist/templates/waitlist/`) with
a shared base layout in `core/templates/base.html`.

### Views Layer
Standard Django views (function-based and class-based) returning:
- Full HTML pages for initial page loads
- HTML fragments for HTMX requests (detected via `request.headers.get('HX-Request')`)

### Models Layer
Django ORM models with business logic encapsulated in model methods. No changes
to the existing data model are planned initially.

### Notifications (Optional)
Waitlist and borrow-related email is sent via plain Python functions invoked through
`run_async_task()` (synchronous when the toggle is on). Overdue borrow reminders are
handled by `python manage.py send_overdue_reminders`, intended for an external
scheduler. Both paths honor `KAMU_ENABLE_ASYNC_TASKS`; when it is off, they do nothing.

## Authentication

- Django session-based authentication (default)
- Okta SAML2 authentication (when `OKTA_METADATA_URL` is set)
- Login required for all views except the login page itself

## Static Assets

- **CSS**: Tailwind CSS, compiled via standalone CLI (`tailwindcss` binary)
- **JS**: HTMX and petite-vue loaded as vendored static files (no CDN, no npm)
- **Images**: Served via WhiteNoise from `static/images/`
- **No webpack, no Node.js runtime dependency**
