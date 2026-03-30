# Kamu — AI Agent Guide

## Project Summary

Kamu is a physical library management app (Django). It is being modernized from
a React SPA + Django REST Framework architecture to server-rendered Django
templates with HTMX, petite-vue, and Tailwind CSS.

**Read these docs before starting any work:**
- `docs/ARCHITECTURE.md` — System design and principles
- `docs/TECH_STACK.md` — Current vs target technology
- `docs/TDD_WORKFLOW.md` — Mandatory TDD process
- `docs/FEATURES.md` — Feature breakdown and phase mapping
- `docs/USER_STORIES.md` — Acceptance criteria for every feature
- `docs/DJANGO_STRUCTURE.md` — Target project layout, URL patterns, view patterns
- `docs/FRONTEND.md` — HTMX, petite-vue, and template patterns
- `docs/DATABASE_SCHEMA.md` — Data model (no changes planned)
- `docs/DOCKER.md` — Podman-first container strategy
- `docs/ASSETS.md` — Tailwind CSS setup and static asset management

**Track all changes in:** `docs/AI_CHANGELOG.md`

---

## Current Status

**Active Phase:** COMPLETE
**Overall Progress:** All phases (0–4) COMPLETE. Modernization finished.

---

## Phase Overview

| Phase | Name                        | Status      | Description                                    |
|-------|-----------------------------|-------------|------------------------------------------------|
| 0     | Foundation & Infrastructure | COMPLETE    | Feature toggle, Podman, Postgres, CI, cleanup  |
| 1     | Asset Pipeline              | COMPLETE    | Tailwind CSS, HTMX/petite-vue vendor, base templates |
| 2     | Frontend Migration          | COMPLETE    | Page-by-page conversion to Django templates    |
| 3     | Legacy Cleanup              | COMPLETE    | Remove DRF, React, Webpack, Node.js            |
| 4     | Polish                      | COMPLETE    | Performance, accessibility, final docs         |

---

## Phase 0: Foundation & Infrastructure

### P0.1: Celery Feature Toggle [DONE 2026-03-19]

**Goal:** Gate all Celery/Redis functionality behind `KAMU_ENABLE_ASYNC_TASKS` env var.

**TDD Steps:**
1. Write test: `core/test/test_feature_toggles.py`
   - Test `run_async_task()` calls `.delay()` when toggle is True
   - Test `run_async_task()` is a no-op when toggle is False
2. Write test: `waitlist/test/test_tasks.py` (update existing)
   - Test book return skips notification when toggle is off
   - Test waitlist join skips notification when toggle is off
3. Run tests — confirm RED
4. Implement `core/feature_toggles.py`
5. Add `KAMU_ENABLE_ASYNC_TASKS` to `core/settings/common.py`
6. Update `books/models.py` and `waitlist/models.py` to use `run_async_task()`
7. Run tests — confirm GREEN
8. Update `.env` with `KAMU_ENABLE_ASYNC_TASKS=False`

**Files to modify:**
- `core/feature_toggles.py` (new)
- `core/settings/common.py`
- `books/models.py`
- `waitlist/models.py`
- `waitlist/tasks.py`
- `books/cron/send_notification.py`
- `core/test/test_feature_toggles.py` (new)
- `.env`

---

### P0.2: Podman + podman-compose [DONE 2026-03-19]

**Goal:** Replace Docker with Podman for all container operations.

**Steps:**
1. Rename `Dockerfile` → `Containerfile`
2. Create `podman-compose.yml` (replace `docker-compose.yml`)
3. Add PostgreSQL with healthcheck
4. Add optional Redis + Celery worker (behind `async` profile)
5. Update `Makefile` targets (remove `docker-` prefix)
6. Remove old `docker-compose.yml`

**Manual test for developer:**
- [ ] Run `podman-compose up` — web and database start
- [ ] Run `make migrate` — migrations succeed
- [ ] Run `make createsuperuser` — can create admin user
- [ ] Run `make loaddata` — seed data loads
- [ ] Visit http://localhost:8000 — app loads (React SPA still works)

---

### P0.3: PostgreSQL for All Environments [DONE 2026-03-19]

**Goal:** Eliminate SQLite. Use PostgreSQL everywhere.

**Steps:**
1. Update `core/settings/dev.py` to use `DATABASE_URL` defaulting to local Postgres
2. Update `core/settings/test.py` to use PostgreSQL
3. Remove SQLite database file from .gitignore (if tracked)
4. Verify all existing tests pass against PostgreSQL

**Manual test for developer:**
- [ ] Delete `db.sqlite3`
- [ ] Run `make migrate` → `make loaddata` → visit app
- [ ] Run `make test` — all tests pass

---

### P0.4: GitHub Actions CI [DONE 2026-03-19]

**Goal:** Replace CircleCI with GitHub Actions.

**Steps:**
1. Create `.github/workflows/cicd.yml`
   - Python tests with PostgreSQL service container
   - Coverage reporting
   - Linting (flake8)
2. Remove `.circleci/` directory
3. Remove `.codeclimate.yml`
4. Update `Makefile` to remove CodeClimate references

---

### P0.5: Remove Heroku/Dokku References [DONE 2026-03-19]

**Goal:** Clean up all deployment references to Heroku and Dokku.

**Files to modify/remove:**
- `Procfile` — remove
- `app.json` — remove
- `.buildpacks` — remove
- `.profile` — remove
- `.profile.d/` — remove
- `runtime.txt` — remove (Python version in pyproject.toml)
- `package.json` — remove `heroku-prebuild`, `heroku-postbuild` scripts
- `README.md` — remove Heroku/Dokku deployment sections

---

### P0.6: Python 3.12 Compatibility Check [DONE 2026-03-25]

**Goal:** Test if Okta SAML2 plugin works with Python 3.12.

**Research findings (2026-03-19):**
- `grafana-django-saml2-auth` v3.20.0 explicitly supports Python 3.12 (current: 3.18.2)
- `pysaml2` v7.5.4 fixed Python 3.12 deprecation warnings (current: 7.5.0)
- Both packages need version bumps before switching to Python 3.12

**Manual verification (2026-03-25):**
- [x] Updated dependencies and Python version
- [x] Start podman: `podman machine start`
- [x] Start app: `podman-compose up --build`
- [x] Visit http://localhost:8000 — app loads
- [x] Okta login — works
- [x] `make test` — all tests pass

**Decision:** Python 3.12 confirmed. Switch committed.

---

## Phase 1: Asset Pipeline

### P1.1: Tailwind CSS Setup [DONE 2026-03-25]

**Completed steps:**
1. Downloaded Tailwind CSS v4.2.2 standalone CLI
2. Created `static/css/input.css` with v4 CSS-first config (no `tailwind.config.js` — v4 uses `@theme`, `@utility`, `@source` directives)
3. Added `static` to `STATICFILES_DIRS` in `core/settings/common.py`
4. Added `tailwind-build` and `tailwind-watch` targets to `Makefile`
5. Added `static/css/output.css` and `tailwindcss` to `.gitignore`
6. Verified build produces valid CSS (~14KB minified)
7. Updated `docs/ASSETS.md` to reflect v4 syntax

---

### P1.2: Vendor HTMX and petite-vue [DONE 2026-03-26]

**Completed steps:**
1. Downloaded HTMX v2.0.7 to `static/vendor/htmx.min.js` (51KB)
2. Downloaded petite-vue v0.4.1 to `static/vendor/petite-vue.es.js` (17KB)
3. Vendored files committed (no CDN, no npm — files ship with the repo)

---

### P1.3: Base Template [DONE 2026-03-26]

**Completed steps:**
1. Created `core/templates/base.html` — full page skeleton with Tailwind CSS, HTMX (CSRF via hx-headers), petite-vue (ES module), dark mode (inline script prevents FOUC), Django messages, semantic HTML
2. Created `core/templates/navbar.html` — responsive nav with logo (light/dark), desktop + mobile menu (petite-vue toggle), theme toggle (sun/moon Heroicons), links matching React Header (Home, My Books, Add Book, Admin)
3. Settings already correct — no changes needed
4. Verified: Tailwind build picks up template classes (11.7KB output), all 5 static files resolve via Django finders, both templates load without errors

---

## Phase 2: Frontend Migration (Page-by-Page)

**Each page follows the TDD workflow. New Django template views are added
ABOVE the React catch-all route in `core/urls.py`.** Both frontends coexist
during this phase.

### P2.1: Library Listing Page [DONE 2026-03-26]

**TDD tests written (8 tests, all pass):**
- `test_library_list_requires_login`
- `test_library_list_returns_200`
- `test_library_list_uses_correct_template`
- `test_library_list_shows_all_libraries`
- `test_library_list_links_to_book_listing`
- `test_library_list_shows_libraries_ordered_by_name`
- `test_library_list_redirects_to_last_visited`
- `test_library_list_ignores_invalid_last_visited_cookie`

**Manual test:**
- [ ] Visit `/` — see list of libraries
- [ ] Click a library — navigate to book list (still React SPA for now)
- [ ] Revisit `/` — redirected to last library (cookie set by book list in P2.2)

---

### P2.2: Book Listing Page [DONE 2026-03-26]

**TDD tests written (17 tests, all pass):**
- `test_book_list_requires_login`
- `test_book_list_returns_200`
- `test_book_list_returns_404_for_invalid_library`
- `test_book_list_uses_correct_template`
- `test_book_list_shows_books_for_library`
- `test_book_list_does_not_show_books_from_other_libraries`
- `test_book_list_shows_availability_for_available_book`
- `test_book_list_shows_borrowed_status`
- `test_book_list_paginates_results`
- `test_book_list_second_page`
- `test_book_list_htmx_returns_fragment`
- `test_book_list_search_filters_by_title`
- `test_book_list_search_filters_by_author`
- `test_book_list_search_filters_by_isbn`
- `test_book_list_empty_search_shows_all`
- `test_book_list_sets_last_library_cookie`
- `test_book_list_shows_library_name`

**Manual test:**
- [ ] Visit `/libraries/quito/` — see paginated books
- [ ] Click "Next" — page updates without full reload (HTMX)
- [ ] Type in search — results filter live (HTMX + petite-vue debounce)

---

### P2.3: Book Detail Page [DONE 2026-03-26]

**TDD tests (9 tests):** book_detail_returns_200, requires_login, uses_correct_template, shows_book_info, shows_availability, shows_action_button, 404_for_book_not_in_library, shows_borrowed_status, shows_goodreads_link

---

### P2.4: Borrow & Return Actions [DONE 2026-03-26]

**TDD tests (5 tests):** borrow_book_post_borrows_copy, borrow_returns_updated_action_fragment_for_htmx, borrow_redirects_for_non_htmx, return_book_post_returns_copy, return_returns_updated_action_fragment_for_htmx

---

### P2.5: Waitlist Join/Leave [DONE 2026-03-26]

**TDD tests (4 tests):** join_waitlist_creates_item, join_waitlist_returns_updated_button, leave_waitlist_removes_item, leave_waitlist_returns_updated_button

---

### P2.6: My Books Page [DONE 2026-03-26]

**TDD tests (6 tests):** my_books_returns_200, requires_login, uses_correct_template, shows_borrowed_books, shows_waitlist, does_not_show_other_users_books

---

### P2.7: Theme Toggle [DONE 2026-03-26]

Implemented in P1.3 (navbar.html). petite-vue v-scope with darkMode state, inline script prevents FOUC, localStorage persistence. No Django tests needed (purely client-side).

---

## Phase 3: Legacy Cleanup

### P3.1: Remove Django REST Framework [DONE 2026-03-26]

Removed: `rest_framework`, `django_filters`, `drf-nested-routers`, `django-webpack-loader` from INSTALLED_APPS, settings, pyproject.toml. Deleted `books/serializers.py`, `waitlist/serializers.py`, `core/templates/rest_framework/`, all DRF viewsets and API URL routes. Removed 48 DRF API tests (replaced by Django template view tests).

---

### P3.2: Remove React & Frontend Build [DONE 2026-03-26]

Deleted: `assets/src/`, `assets/test/`, `config/jest/`, `package.json`, `package-lock.json`, `webpack.config.js`, `dev-server.js`, `.babelrc`, `.eslintrc`, `.eslintignore`, `.nvmrc`, `webpack-stats.json`, `webpack-stats-test.json`, `node_modules/`, `books/templates/index.html` (React shell), `FrontendView`, husky pre-commit hook.

128 tests pass. React is fully replaced.

---

## Phase 4: Polish

### P4.1: Performance Review [DONE 2026-03-26]
- Tailwind CSS output: 20KB (purged, minified) ✓
- HTMX 51KB + petite-vue 17KB (vendored, minified) ✓
- WhiteNoise middleware with 1-year `max-age` caching ✓
- Google Fonts `preconnect` hints for faster font loading ✓
- Removed empty `public/` from `STATICFILES_DIRS` ✓
- `loading="lazy"` on book cover images ✓

### P4.2: Accessibility Review [DONE 2026-03-26]
- Skip-to-content link (visible on focus) ✓
- Semantic HTML: `<nav>`, `<main>`, `<footer>`, `<button>`, `<a>` ✓
- `aria-label` on navbar, search input, toggle buttons, pagination ✓
- Heading hierarchy: single `<h1>` per page, `<h2>` for subsections ✓
- `role="alert"` on flash messages ✓
- Focus styles via Tailwind defaults ✓

### P4.3: Final Documentation [DONE 2026-03-26]
- README updated: tech stack table (no more "legacy" column), Python 3.12+ ✓
- Removed `ANALYTICS_ACCOUNT_ID` env var (React analytics removed) ✓
- AGENTS.md: all phases marked COMPLETE ✓
- AI_CHANGELOG.md: final entry added ✓

---

## Rules for AI Agents

1. **Always read this file first** to understand current status and next task
2. **Follow TDD workflow** — write tests first, see them fail, then implement
3. **Update this file** after completing each task (mark as DONE with date)
4. **Update AI_CHANGELOG.md** with every change
5. **Create manual test tasks** for the developer after each phase
6. **Never skip tests** — if tests can't be written, explain why
7. **One phase at a time** — don't jump ahead
8. **Ask the developer** if anything is unclear or a decision is needed
9. **Keep the React SPA working** until Phase 3 (both frontends coexist in Phase 2)
10. **Commit frequently** — small, focused commits with clear messages
