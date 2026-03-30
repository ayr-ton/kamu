# Features

## Feature Map

| ID    | Feature                        | Stories         | Phase | Status    |
|-------|--------------------------------|-----------------|-------|-----------|
| F-001 | Library listing                | US-001          | 2     | Planned   |
| F-002 | Book listing with pagination   | US-002          | 2     | Planned   |
| F-003 | Book search                    | US-003          | 2     | Planned   |
| F-004 | Book detail view               | US-004          | 2     | Planned   |
| F-005 | Borrow a book                  | US-005          | 2     | Planned   |
| F-006 | Return a book                  | US-006          | 2     | Planned   |
| F-007 | My borrowed books              | US-007          | 2     | Planned   |
| F-008 | Join waitlist                  | US-008          | 2     | Planned   |
| F-009 | Leave waitlist                 | US-009          | 2     | Planned   |
| F-010 | My waitlist                    | US-010          | 2     | Planned   |
| F-011 | ISBN book lookup (admin)       | US-011          | —     | Exists    |
| F-012 | Report missing/found (admin)   | US-012, US-013  | —     | Exists    |
| F-013 | Export book data (admin)       | US-014          | —     | Exists    |
| F-014 | Theme toggle                   | US-015          | 2     | Planned   |
| F-015 | Authentication (Django + Okta) | US-016          | 0     | Exists    |
| F-016 | Email notifications (toggle)   | US-017–019      | 0     | Planned   |
| F-017 | Notification feature toggle    | —               | 0     | Planned   |

---

## Phase 0: Foundation & Infrastructure

### F-017: Notification Feature Toggle
Add `KAMU_ENABLE_ASYNC_TASKS` environment variable (default `False`).
When disabled, `run_async_task()` does not invoke notification functions.
When enabled, waitlist-related email runs synchronously (no task queue).
Scheduled overdue reminders use `manage.py send_overdue_reminders` (for example
Cloud Scheduler + Cloud Run Jobs) and honor the same toggle via
`books/cron/send_notification.py`.

**Tasks:**
- [ ] Create feature toggle setting in `core/settings/common.py`
- [ ] Implement `run_async_task()` so it calls notification functions only when toggle is on
- [ ] Wire `waitlist/tasks.py` through the toggle from model/view code
- [ ] Ensure `books/cron/send_notification.py` and `send_overdue_reminders` respect the toggle
- [ ] Write tests for toggle on/off behavior
- [ ] Update `.env` template with `KAMU_ENABLE_ASYNC_TASKS=False`

### Infrastructure Tasks (Phase 0)
- [ ] Replace docker-compose.yml with podman-compose.yml
- [ ] Add PostgreSQL service to podman-compose
- [ ] Update Dockerfile for podman compatibility
- [ ] Update Makefile targets (docker → podman)
- [ ] Create GitHub Actions CI workflow
- [ ] Remove Heroku/Dokku references from README, Procfile, app.json, .buildpacks
- [ ] Test Python 3.12 compatibility with Okta SAML2 plugin
- [ ] Switch to PostgreSQL for all environments

---

## Phase 1: Asset Pipeline

### Tailwind CSS Setup
- [ ] Download Tailwind CSS standalone CLI binary
- [ ] Create `tailwind.config.js`
- [ ] Create base `input.css` with Tailwind directives
- [ ] Add Tailwind build command to Makefile
- [ ] Create `core/templates/base.html` layout with Tailwind
- [ ] Vendor HTMX and petite-vue JS files into `static/vendor/`

### Style Migration Stories
Each existing CSS file needs to be migrated to Tailwind utilities:

| Current File               | Target                        |
|---------------------------|-------------------------------|
| App.css                   | Tailwind utilities in templates |
| Header.css                | Tailwind utilities in templates |
| Book.css                  | Tailwind utilities in templates |
| BookList.css              | Tailwind utilities in templates |
| BookDetail.css            | Tailwind utilities in templates |
| LibrarySelector.css       | Tailwind utilities in templates |
| SearchBar.css             | Tailwind utilities in templates |
| MyBooks.css               | Tailwind utilities in templates |
| ErrorMessage.css          | Tailwind utilities in templates |
| ErrorBoundary.css         | Tailwind utilities in templates |
| WaitlistIndicator.css     | Tailwind utilities in templates |

---

## Phase 2: Page-by-Page Frontend Migration

Each page follows this sequence:
1. Write Django view tests (TDD)
2. Create Django view (full page + HTMX fragment)
3. Create Django template with Tailwind CSS
4. Add HTMX attributes for dynamic interactions
5. Add petite-vue for reactive islands (where needed)
6. Manual verification task

### F-001: Library Listing Page
- Django view at `/`
- Template: `books/templates/books/library_list.html`
- Lists all libraries with links
- Remembers last visited library (cookie/localStorage)

### F-002: Book Listing Page
- Django view at `/libraries/<slug>/`
- Template: `books/templates/books/book_list.html`
- Paginated book grid/list
- HTMX: pagination loads next page without full reload

### F-003: Book Search
- Part of book listing page
- petite-vue: debounced search input
- HTMX: `hx-get` triggers filtered book list partial
- Template: `books/templates/books/partials/book_list_items.html`

### F-004: Book Detail
- Django view at `/libraries/<slug>/books/<pk>/`
- Template: `books/templates/books/book_detail.html`
- Shows full book information, copies, waitlist status
- HTMX: action buttons (borrow/return/waitlist) update in place

### F-005 + F-006: Borrow and Return
- POST endpoints handled by Django views
- HTMX: button submits via `hx-post`, response swaps the action button area
- No page reload needed

### F-008 + F-009: Waitlist Join/Leave
- POST/DELETE endpoints handled by Django views
- HTMX: same pattern as borrow/return

### F-007 + F-010: My Books & My Waitlist
- Django view at `/my-books/`
- Template: `books/templates/books/my_books.html`
- Two sections: borrowed books and waitlist
- Each book links to its detail page

### F-014: Theme Toggle
- petite-vue component in header
- Toggles `dark` class on `<html>` element
- Persists preference in localStorage
- Tailwind `dark:` variants for all components

---

## Phase 3: Legacy Cleanup

- [ ] Remove Django REST Framework and all serializers
- [ ] Remove `drf-nested-routers`, `django-filter` (DRF integration)
- [ ] Remove React, all JSX components, and test files
- [ ] Remove Webpack config, Babel config, dev-server.js
- [ ] Remove Node.js dependencies (package.json, package-lock.json, node_modules)
- [ ] Remove `.eslintrc`, `.eslintignore`, `.babelrc`, `.nvmrc`
- [ ] Remove `django-webpack-loader` from settings and dependencies
- [ ] Remove `webpack-stats.json`, `webpack-stats-test.json`
- [ ] Remove CircleCI config (`.circleci/`)
- [ ] Remove CodeClimate config (`.codeclimate.yml`)
- [ ] Remove Husky config
- [ ] Clean up `pyproject.toml` — remove unused Python packages
- [ ] Update `requirements.lock`

---

## Phase 4: Polish

- [ ] Verify all manual tests pass
- [ ] Performance review (WhiteNoise caching, Tailwind purge)
- [ ] Accessibility review (semantic HTML, ARIA labels)
- [ ] Update all documentation to reflect final state
- [ ] Final cleanup of TODO.md
