# AI Changelog

All changes made by AI agents are tracked here in reverse chronological order.

---

## [2026-03-30]

### Remove Celery/Redis — Synchronous notifications for Cloud Run

**Goal:** Replace Celery + Redis with synchronous function calls, aligning with
Cloud Run's scale-to-zero model. Notifications are now sent inline during the
HTTP request. Overdue reminders are triggered via a management command
(`send_overdue_reminders`) intended for Cloud Scheduler + Cloud Run Jobs.

**Removed files:**
- `core/celery.py` — Celery app configuration

**Changed files:**
- `waitlist/tasks.py` — Removed `@shared_task` decorators and Celery imports; functions are now plain Python
- `core/feature_toggles.py` — `run_async_task()` calls functions directly instead of `.delay()`
- `core/__init__.py` — Removed Celery app import
- `core/settings/common.py` — Removed `CELERY_BROKER_URL`
- `core/settings/cron.py` — Removed `CRONJOBS` list (django-crontab format)
- `pyproject.toml` — Removed `celery[redis]` and `vine` dependencies
- `compose.yml` — Removed `redis` and `worker` services (async profile)
- `Makefile` — Removed `dev-async` target
- `README.md` — Updated async section: no Celery/Redis, documents management command
- `core/test/test_feature_toggles.py` — Updated assertions from `.delay()` to direct calls
- `books/test/test_models.py` — Updated notification assertions from `.delay()` to direct calls
- `waitlist/test/test_models.py` — Updated notification assertions from `.delay()` to direct calls

**New files:**
- `books/management/commands/send_overdue_reminders.py` — Management command for Cloud Scheduler

**Documentation:** `docs/ARCHITECTURE.md`, `docs/TECH_STACK.md`, `docs/DOCKER.md`, `docs/DJANGO_STRUCTURE.md`, and `docs/FEATURES.md` — aligned with no Celery/Redis: synchronous notifications, `send_overdue_reminders`, and `compose.yml`-only dev stack.

**Tests:** 128 total, all PASS.

---

## [2026-03-26]

### P4.1–P4.3: Performance, Accessibility, Documentation

**Changed files:**
- `core/templates/base.html` — Added `preconnect` hints for Google Fonts, skip-to-content link (`sr-only focus:not-sr-only`), `id="main-content"` on `<main>`, updated favicon `rel` to `icon`.
- `core/templates/navbar.html` — Added `aria-label="Main navigation"` on `<nav>`.
- `core/settings/common.py` — Removed empty `public/` from `STATICFILES_DIRS`, added `WHITENOISE_MAX_AGE = 31536000` (1 year) for static asset caching.
- `README.md` — Replaced modernization table with final tech stack, updated Python version to 3.12+, removed `ANALYTICS_ACCOUNT_ID` env var.
- `AGENTS.md` — All phases marked COMPLETE.

**Tests:** 128 total, all PASS. All phases complete.

### P3.1: Remove Django REST Framework

**Removed files:**
- `books/serializers.py`, `waitlist/serializers.py`
- `core/templates/rest_framework/login.html`, `core/templates/rest_framework/api.html`

**Changed files:**
- `books/views.py` — Removed all DRF viewsets (`LibraryViewSet`, `BookViewSet`, `UserView`, `UserBooksView`, `UserWaitlistView`, `FrontendView`), DRF imports, `get_book_filters_from_request`. Kept `IsbnFormView` and new Django template views.
- `waitlist/views.py` — Removed `WaitlistViewSet`. Waitlist functionality now in `books.views`.
- `core/urls.py` — Removed DRF router, all `/api/` routes, React catch-all. Clean URL config with only Django template views.
- `core/settings/common.py` — Removed `rest_framework`, `webpack_loader`, `django_filters` from `INSTALLED_APPS`. Removed `WEBPACK_LOADER` and `REST_FRAMEWORK` config blocks.
- `core/settings/test.py` — Removed `WEBPACK_LOADER` override.
- `pyproject.toml` — Removed `django-webpack-loader`, `djangorestframework`, `django-filter`, `drf-nested-routers`.
- `books/test/test_views.py` — Removed 6 DRF test classes (48 tests): `LibraryViewSet`, `LibraryViewSetQueryParameters`, `BookViewSetTest`, `UserViewTest`, `UserBooksViewTest`, `UserWaitlistViewTest`, `FrontendViewTest`.
- `waitlist/test/test_views.py` — Removed `WaitlistViewSetTest` (7 tests).

### P3.2: Remove React & Frontend Build

**Deleted files/dirs:**
- `assets/src/` (all React components)
- `assets/test/` (all JS tests)
- `config/jest/` (Jest config)
- `package.json`, `package-lock.json`
- `webpack.config.js`, `dev-server.js`
- `.babelrc`, `.eslintrc`, `.eslintignore`, `.nvmrc`
- `webpack-stats.json`, `webpack-stats-test.json`
- `books/templates/index.html` (React SPA shell)
- Husky pre-commit hook (`.git/hooks/pre-commit`)

**Tests:** 128 total, all PASS. React fully replaced by Django templates + HTMX + petite-vue.

### P2.3–P2.7: Book Detail, Borrow/Return, Waitlist, My Books, Theme Toggle

**Changed files:**
- `books/views.py` — Added `book_detail`, `borrow_book`, `return_book`, `join_waitlist`, `leave_waitlist`, `my_books` views. All use `@login_required`. Action views return HTMX fragments for `HX-Request`, redirect otherwise. Shared `_book_action_context` helper.
- `books/urls.py` — Added detail, borrow, return, waitlist join/leave URL patterns.
- `core/urls.py` — Added `path('my-books/', views.my_books)`.
- `books/templates/books/book_detail.html` — New. Breadcrumb nav, cover image, metadata, description, Goodreads link, copies table, action button area.
- `books/templates/books/partials/book_action.html` — New. HTMX action button partial (Borrow/Return/Join Waitlist/Leave Waitlist) with `hx-post` and `hx-target`.
- `books/templates/books/my_books.html` — New. Two sections: borrowed books and waitlist. Each links to book detail.
- `books/test/test_views.py` — Added `BookDetailViewTest` (9), `BorrowReturnViewTest` (5), `WaitlistViewTest` (4), `MyBooksViewTest` (6) = 24 new tests.

**Tests:** 176 total, all PASS. Phase 2 complete.

### P2.2: Book Listing Page

**Changed files:**
- `books/views.py` — Added `book_list` view with search (`?q=`), pagination (20 per page), HTMX fragment support (`HX-Request` header), availability annotation via `Exists` subquery, and `last_library` cookie.
- `books/urls.py` — New. App-level URL pattern: `path("", views.book_list, name="book-list")`.
- `core/urls.py` — Added `path('libraries/<slug:slug>/', include('books.urls'))` above React catch-all.
- `books/templates/books/book_list.html` — New. Extends `base.html`. Search input with petite-vue `v-model` + HTMX debounced trigger. Library name, book count, `#book-list` target div.
- `books/templates/books/partials/book_list_items.html` — New. HTMX fragment: responsive grid of book cards (cover, title, author, availability badge), pagination with HTMX links, empty states for no results and no books.
- `books/test/test_views.py` — Added `BookListViewTest` (17 tests). Updated `FrontendViewTest` to use `/unmigrated-path/`.

**Tests:**
- Added: 17 tests in `BookListViewTest`
- Updated: `FrontendViewTest` URL changed to `/unmigrated-path/`
- Status: 152 tests PASS

### P2.1: Library Listing Page

**Changed files:**
- `books/views.py` — Added `library_list` view function. Checks `last_library` cookie for redirect; otherwise renders library list ordered by name.
- `books/templates/books/library_list.html` — New. Extends `base.html`. Shows libraries as clickable cards with chevron icons, empty state message, Tailwind styling.
- `core/urls.py` — Added `path('', views.library_list, name='library-list')` above React catch-all.
- `books/test/test_views.py` — Added `LibraryListViewTest` (8 tests). Updated `FrontendViewTest` to use `/libraries/any-slug/` instead of `/` (which is now the library list).

**Tests:**
- Added: 8 tests in `LibraryListViewTest` — login required, returns 200, correct template, shows all libraries, links to book listing, ordered by name, redirect on last_visited cookie, ignores invalid cookie
- Updated: 3 tests in `FrontendViewTest` — changed test URL from `/` to `/libraries/any-slug/` (React catch-all still works)
- Status: 135 tests PASS

### P1.3: Base Template

**Changed files:**
- `core/templates/base.html` — New. Base layout with Tailwind CSS, HTMX (CSRF via `hx-headers`), petite-vue (ES module import), dark mode (inline script prevents FOUC), Django messages with role="alert", footer. Blocks: `title`, `content`, `extra_head`, `extra_js`.
- `core/templates/navbar.html` — New. Responsive navigation with petite-vue (`v-scope` for `menuOpen` + `darkMode`). Logo swaps light/dark via `v-show`. Desktop links: Home, My Books, Add Book, Admin, theme toggle. Mobile: hamburger menu with same links. Heroicons (outline) for all icons. Sticky positioning, accessible ARIA labels.

**Notes:**
- petite-vue loaded as ES module (`<script type="module">import { createApp }...`). This defers execution until DOM is parsed, which is what petite-vue needs.
- Dark mode FOUC prevented by inline `<script>` in `<head>` that reads `localStorage` before first paint. petite-vue then takes over for toggling.
- No Django/petite-vue delimiter conflict — navbar only uses `v-show`, `v-scope`, `@click` (no `{{ }}` interpolation in petite-vue context).
- Tailwind build output grew from ~6KB to ~11.7KB with navbar/base template classes included.
- No settings changes needed — `TEMPLATES.DIRS` already includes `core/templates`, `STATICFILES_DIRS` already includes `static` and `assets`.
- Phase 1 is now fully COMPLETE.

### P1.2: Vendor HTMX and petite-vue

**Changed files:**
- `static/vendor/htmx.min.js` — New. HTMX v2.0.7 minified (51KB). Downloaded from GitHub releases.
- `static/vendor/petite-vue.es.js` — New. petite-vue v0.4.1 ES module (17KB). Downloaded from npm/unpkg.
- `AGENTS.md` — Marked P1.2 as DONE, updated current status and phase table.

**Notes:**
- Files are vendored (committed to repo) — no CDN dependency, no npm needed at runtime
- HTMX handles partial page updates (borrow/return, pagination, search)
- petite-vue handles reactive islands (theme toggle, search input debounce)
- Both are loaded as static files via `{% static 'vendor/...' %}` in templates

---

## [2026-03-25]

### P1.1: Tailwind CSS Setup

**Changed files:**
- `static/css/input.css` — New. Tailwind v4 CSS-first config with `@theme`, `@utility`, `@source`, `@custom-variant` directives. Defines primary colors, font, dark mode, and reusable component utilities (btn, card).
- `Containerfile` — Added `tailwind` stage (Debian slim + CLI binary) and `build-tailwind` stage (produces minified CSS). Production `build` stage copies output from `build-tailwind`.
- `core/settings/common.py` — Added `static` to `STATICFILES_DIRS`
- `Makefile` — `tailwind-build` and `tailwind-watch` run via container (no local binary needed). `tailwind-image` builds the CLI container.
- `.gitignore` — Added `static/css/output.css` and `tailwindcss`
- `docs/ASSETS.md` — Updated from v3 to v4 syntax, documented containerized CLI approach

**Notes:**
- Tailwind v4.2.2 uses CSS-first configuration — no `tailwind.config.js` needed
- CLI runs in a Debian container (Alpine incompatible due to musl/glibc mismatch)
- Container image is cached by Podman; subsequent builds resolve in ~6s
- Key v3→v4 changes: `@import "tailwindcss"` replaces `@tailwind` directives, `@utility` replaces `@layer components`, `shadow-sm`→`shadow-xs`, `outline-none`→`outline-hidden`

### P0.6: Python 3.12 Compatibility Check — VERIFIED

**Manual verification passed:**
- Dependencies bumped: `grafana-django-saml2-auth>=3.20.0`, `pysaml2>=7.5.4`
- Python version updated to 3.12
- App loads, Okta login works, all tests pass
- Phase 0 is now fully complete

---

## [2026-03-20]

### Production deploy on git tags

- `.github/workflows/cicd.yml` — `on.push.tags` added; **`deploy-prod`** runs only when `github.ref` starts with `refs/tags/` (not on `main` push or `workflow_dispatch`). **`deploy-dev`** unchanged (main + CI/CD dispatch only).
- `.github/workflows/deploy-prod.yml` — Pushes image tags `${{ github.sha }}` and `${{ github.ref_name }}`; Cloud Run still uses the SHA-tagged image.

### Cloud Run deploy docs + reusable workflows + production path

- Removed `DEPLOY-DEV.md`; added generic `DEPLOY.md` (parameters table, WIF notes, links to workflows as source of truth).
- Added `.github/workflows/deploy-dev.yml` (`workflow_call` + `workflow_dispatch`) and `.github/workflows/deploy-prod.yml` (`workflow_call`) for build/push/deploy; callers use `secrets: inherit`.
- Updated `.github/workflows/cicd.yml`: invokes `test.yml`, `deploy-dev.yml`, and `deploy-prod.yml` with `secrets: inherit`; prod secrets and GitHub Environment `production` (required reviewers). **Deploy dev** can be run alone from **Actions → Deploy dev** on any branch. (Prod trigger: **tag push** — see subsection above.)
- Added [`.github/workflows/test.yml`](.github/workflows/test.yml) (`workflow_call` + `workflow_dispatch`); **Actions → Test** runs the suite without deploys.

## [2026-03-19]

### Rename CI workflow to CI/CD

- `.github/workflows/ci.yml` renamed to `.github/workflows/cicd.yml`
- Updated references in `README.md`, `AGENTS.md`, `docs/DJANGO_STRUCTURE.md`

### Phase 0: Foundation & Infrastructure

#### P0.1: Celery Feature Toggle

**Changed files:**
- `core/feature_toggles.py` — New module with `is_async_tasks_enabled()` and `run_async_task()`
- `core/settings/common.py` — Added `KAMU_ENABLE_ASYNC_TASKS` setting (default: False)
- `books/models.py` — `return_to_library()` now uses `run_async_task()` instead of direct `.delay()`
- `waitlist/models.py` — `create_item()` now uses `run_async_task()` instead of direct `.delay()`
- `books/cron/send_notification.py` — Early return when toggle is off
- `.env` — Added `KAMU_ENABLE_ASYNC_TASKS=False`

**Tests:**
- Added: `core/test/test_feature_toggles.py` (7 tests) — toggle on/off, missing setting
- Updated: `books/test/test_models.py` — split notification test into toggle-on/toggle-off variants
- Updated: `waitlist/test/test_models.py` — split notification test into toggle-on/toggle-off variants
- Status: 127 tests PASS

#### P0.2: Podman + podman-compose

**Changed files:**
- `Containerfile` — New (replaces Dockerfile), multi-stage build with gunicorn
- `podman-compose.yml` — New (replaces docker-compose.yml), PostgreSQL 16, healthcheck, async profile
- `Makefile` — Rewritten with podman-compose targets
- `Dockerfile` — Deleted
- `docker-compose.yml` — Deleted

#### P0.3: PostgreSQL for All Environments

**Changed files:**
- `core/settings/common.py` — Default DATABASE_URL changed from SQLite to PostgreSQL

#### P0.4: GitHub Actions CI

**Changed files:**
- `.github/workflows/cicd.yml` — CI/CD workflow (Python tests with PostgreSQL service, coverage, flake8)
- `.circleci/config.yml` — Deleted
- `.codeclimate.yml` — Deleted

#### P0.5: Remove Heroku/Dokku References

**Deleted files:**
- `Procfile`
- `app.json`
- `.buildpacks`
- `runtime.txt`
- `.profile`
- `.profile.d/path.sh`

**Changed files:**
- `package.json` — Removed `heroku-prebuild` and `heroku-postbuild` scripts
- `.gitignore` — Updated Docker section header

#### P0.6: Python 3.12 Compatibility Check (Research Only)

**Findings:**
- `grafana-django-saml2-auth` v3.20.0 supports Python 3.12 (current: 3.18.2)
- `pysaml2` v7.5.4 supports Python 3.12 (current: 7.5.0)
- Both need version bumps before switching
- Manual Okta login test required before committing to the switch

#### Documentation Created

- `docs/ARCHITECTURE.md` — System design
- `docs/TECH_STACK.md` — Technology choices
- `docs/TDD_WORKFLOW.md` — TDD process
- `docs/USER_STORIES.md` — 19 user stories
- `docs/FEATURES.md` — Feature breakdown by phase
- `docs/DJANGO_STRUCTURE.md` — Target project layout
- `docs/FRONTEND.md` — HTMX + petite-vue patterns
- `docs/DATABASE_SCHEMA.md` — Data model
- `docs/DOCKER.md` — Podman strategy
- `docs/ASSETS.md` — Tailwind CSS setup
- `AGENTS.md` — AI agent tracking
- `README.md` — Updated for modernization

---

## Changelog Format

Each entry follows:

```markdown
## [YYYY-MM-DD]

### Phase X.Y: Task Name

**Changed files:**
- `path/to/file.py` — Description of change

**Tests:**
- Added: `test_name` in `path/to/test_file.py`
- Status: PASS / FAIL (reason)

**Manual test required:** Yes / No
- [ ] Test description

**Notes:**
Any relevant context for future AI sessions.
```
