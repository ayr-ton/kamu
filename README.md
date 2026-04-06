[![Test](https://github.com/ayr-ton/kamu-oss/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/ayr-ton/kamu-oss/actions/workflows/test.yml)
# Kamu

> "Some books leave us free and some books make us free."
> — Ralph Waldo Emerson

Kamu is an application for managing a physical library where you can add books,
borrow and return them. Users browse libraries (different offices, cities, or
friend groups), borrow available books, and join waitlists for unavailable ones.

## Tech Stack

| Layer      | Technology                                         |
|------------|----------------------------------------------------|
| Frontend   | Django templates + HTMX + petite-vue + Tailwind CSS |
| Backend    | Django 5.0 (server-rendered HTML)                   |
| Build      | Tailwind CSS standalone CLI (no JS build step)      |
| Database   | PostgreSQL everywhere                               |
| Containers | Podman + podman-compose                             |
| CI/CD      | GitHub Actions                                      |
| Async      | Synchronous (feature-toggled, off by default)       |

## Requirements

- Python 3.12+
- Podman and podman-compose
- Tailwind CSS standalone CLI (for CSS development)

## Quick Start (Podman)

Start the development environment:

```bash
make dev
```

This starts the Django app and PostgreSQL via podman-compose.

Run migrations and seed data:

```bash
make migrate
make createsuperuser
make loaddata
```

Visit [http://localhost:8000](http://localhost:8000).

### CSS Development

When working on templates, run the Tailwind watcher in a separate terminal:

```bash
make tailwind-watch
```

### Email Notifications (Optional)

To enable email notifications (waitlist alerts, overdue reminders), set
`KAMU_ENABLE_ASYNC_TASKS=True` in your `.env` file and configure the
`DJANGO_EMAIL_*` environment variables. Notifications are sent synchronously
during the request — no Redis or background workers needed.

For overdue reminders, run the management command on a schedule (e.g. via
Cloud Scheduler + Cloud Run Jobs):

```bash
python manage.py send_overdue_reminders
```

## Quick Start (Local, No Containers)

Create and activate a Python virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
uv pip compile pyproject.toml -o requirements.lock
uv pip sync requirements.lock
```

Set up the database (requires a local PostgreSQL instance):

```bash
export DATABASE_URL=postgres://kamu:kamu@localhost:5432/kamu
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata dump_data/*.json
```

Start the development server:

```bash
python manage.py runserver
```

## Testing

```bash
# Via containers
make test

# Locally
make local-test

# With coverage
coverage run manage.py test
coverage report
```

## Authentication

### Default (Django Login)

Uses Django's built-in session authentication. Create a superuser with
`make createsuperuser` and log in at `/accounts/login/`.

### Okta SAML2

Set the following environment variables:

```bash
OKTA_METADATA_URL='url-of-okta-saml'
OKTA_ENTITY_ID='url-of-okta-login'
```

To disable Okta authentication:

```bash
unset OKTA_METADATA_URL OKTA_ENTITY_ID
```

## Environment Variables

| Variable                   | Default                | Description                              |
|---------------------------|------------------------|------------------------------------------|
| `DATABASE_URL`            | (required)             | PostgreSQL connection string             |
| `SECRET_KEY`              | (required in prod)     | Django secret key                        |
| `DEBUG`                   | `false`                | Django debug mode                        |
| `OKTA_METADATA_URL`       | (unset)                | Okta SAML2 metadata URL                  |
| `OKTA_ENTITY_ID`          | (unset)                | Okta entity ID                           |

### Email Notifications

| Variable                   | Default                | Description                              |
|---------------------------|------------------------|------------------------------------------|
| `KAMU_ENABLE_ASYNC_TASKS` | `false`                | Enable email notifications               |
| `DJANGO_EMAIL_BACKEND`    | `smtp.EmailBackend`    | Email backend (use `console.EmailBackend` for testing) |
| `DJANGO_EMAIL_FROM`       | (unset)                | Sender address (e.g. `kamu@yourorg.com`) |
| `DJANGO_EMAIL_HOST`       | (unset)                | SMTP server (e.g. `smtp.sendgrid.net`)   |
| `DJANGO_EMAIL_PORT`       | (unset)                | SMTP port (e.g. `587`)                   |
| `DJANGO_EMAIL_HOST_USER`  | (unset)                | SMTP username                            |
| `DJANGO_EMAIL_HOST_PASSWORD` | (unset)             | SMTP password                            |

## Documentation

| Document                       | Purpose                                   |
|-------------------------------|-------------------------------------------|
| `AGENTS.md`                   | AI agent guide and task tracking           |
| `docs/ARCHITECTURE.md`       | System design and principles               |
| `docs/TECH_STACK.md`         | Technology choices and rationale            |
| `docs/TDD_WORKFLOW.md`       | Test-driven development process            |
| `docs/USER_STORIES.md`       | User stories with acceptance criteria      |
| `docs/FEATURES.md`           | Feature breakdown by migration phase       |
| `docs/DJANGO_STRUCTURE.md`   | Target Django project layout               |
| `docs/FRONTEND.md`           | HTMX + petite-vue frontend architecture    |
| `docs/DATABASE_SCHEMA.md`    | Data model documentation                   |
| `docs/DOCKER.md`             | Podman container strategy                  |
| `docs/ASSETS.md`             | Tailwind CSS and static asset management   |
| `docs/AI_CHANGELOG.md`       | Changelog of all AI-driven changes         |

## License

[MIT](LICENSE)
