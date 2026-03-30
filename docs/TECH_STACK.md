# Tech Stack

## Current State (Legacy)

| Layer       | Technology                                         |
|-------------|---------------------------------------------------|
| Backend     | Django 5.0, Django REST Framework, django-filter   |
| Frontend    | React 16, Material-UI 3, React Router 5            |
| Build       | Webpack 4, Babel, Node.js 12, npm                  |
| Database    | SQLite (dev), PostgreSQL (prod)                    |
| Auth        | Django sessions, Okta SAML2 (optional)             |
| Async       | Celery 5.2 + Redis                                |
| Containers  | Docker, docker-compose                             |
| CI/CD       | CircleCI, CodeClimate                              |
| Deployment  | Heroku, Dokku, Docker                              |
| Static      | WhiteNoise, django-webpack-loader                  |
| Testing     | Python unittest, Jest + @testing-library/react     |

## Target State

| Layer       | Technology                                         |
|-------------|---------------------------------------------------|
| Backend     | Django 5.0, standard Django views (CBV/FBV)        |
| Frontend    | HTMX, petite-vue, Tailwind CSS                     |
| Build       | Tailwind CSS standalone CLI only (no JS build)     |
| Database    | PostgreSQL everywhere (dev + prod via Podman)      |
| Auth        | Django sessions, Okta SAML2 (optional)             |
| Async       | Synchronous email + `send_overdue_reminders` command (toggle) |
| Containers  | Podman, podman-compose                             |
| CI/CD       | GitHub Actions                                     |
| Deployment  | Container-based (Podman)                           |
| Static      | WhiteNoise, Tailwind CLI                           |
| Testing     | Python unittest + Django test client (TDD)         |

## Technology Decisions

### HTMX (frontend interactions)
Replaces the React SPA. Server returns HTML fragments; HTMX swaps them into the
page. Handles borrow/return actions, pagination, search, and navigation without
writing JavaScript.

### petite-vue (reactive islands)
Lightweight (~6kb) alternative to Vue.js for small reactive areas. Used for:
- Theme toggle (dark/light mode persistence)
- Search input with debounce
- Small UI state management (dropdowns, modals)

Does NOT require a build step. Loaded as a single JS file.

### Tailwind CSS (styling)
Utility-first CSS framework. Replaces Material-UI and custom CSS files. Requires
a build step via the standalone Tailwind CLI binary — no Node.js needed.

The Tailwind CLI watches template files and generates a single optimized CSS file.

### Podman + podman-compose (containers)
Drop-in replacement for Docker. Rootless containers, no daemon required.
All `docker` and `docker-compose` commands become `podman` and `podman-compose`.

### PostgreSQL (database)
Used in all environments. Local development runs PostgreSQL via podman-compose.
Eliminates SQLite/Postgres behavioral differences between dev and prod.

### GitHub Actions (CI/CD)
Replaces CircleCI. Runs Python tests, Tailwind CSS build, and linting.
No frontend JavaScript tests (minimal JS means minimal JS testing surface).

## Removed Technologies

| Technology                  | Reason                                        |
|-----------------------------|-----------------------------------------------|
| Django REST Framework       | No JSON API needed; server renders HTML        |
| React, React Router         | Replaced by HTMX + petite-vue                 |
| Material-UI                 | Replaced by Tailwind CSS                       |
| Webpack, Babel              | No JS build step needed                        |
| Node.js, npm                | Only Tailwind CLI binary needed                |
| Jest, @testing-library      | No frontend JS tests                           |
| docker, docker-compose      | Replaced by podman, podman-compose              |
| CircleCI, CodeClimate       | Replaced by GitHub Actions                     |
| Heroku, Dokku               | Replaced by container-based deployment          |
| django-webpack-loader       | No webpack bundles to load                     |
| drf-nested-routers          | No REST API routers                            |
| django-filter (DRF filters) | Query filtering done in Django views directly  |
| Celery, Redis               | Replaced by synchronous calls + management command |

## Python Dependencies (Target)

Core:
- `django==5.0.0`
- `grafana-django-saml2-auth` (Okta)
- `whitenoise` (static files)
- `gunicorn` (production server)
- `psycopg2` (PostgreSQL)
- `dj-database-url` (database config)
- `python-decouple` (settings)
- `django-import-export` (admin exports)
- `requests` (Google Books API)

Dev:
- `coverage` (test coverage)
- `ipdb` (debugging)
