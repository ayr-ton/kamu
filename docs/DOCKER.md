# Container Strategy (Podman)

## Overview

All container operations use **Podman** and **podman-compose**. No Docker or
docker-compose commands exist in the project. Podman is a rootless, daemonless
container engine that is command-compatible with Docker.

## Local Development

### Prerequisites

Install Podman and podman-compose:

```bash
# macOS
brew install podman podman-compose
podman machine init
podman machine start

# Linux (Fedora/RHEL)
sudo dnf install podman podman-compose

# Linux (Ubuntu/Debian)
sudo apt install podman
pip install podman-compose
```

### compose.yml

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Containerfile
    image: localhost/kamu:dev
    ports:
      - "8000:8000"
    env_file: .env
    environment:
      - DATABASE_URL=postgres://kamu:kamu@database:5432/kamu
      - DEBUG=true
      - DJANGO_SETTINGS_MODULE=core.settings.dev
      - KAMU_ENABLE_ASYNC_TASKS=false
    volumes:
      - ./core:/app/core
      - ./books:/app/books
      - ./waitlist:/app/waitlist
      - ./static:/app/static
      - ./manage.py:/app/manage.py
      - ./Makefile:/app/Makefile
      - ./requirements.lock:/app/requirements.lock
      - ./pyproject.toml:/app/pyproject.toml
    depends_on:
      database:
        condition: service_healthy
    command: ["run", "manage.py", "runserver", "0.0.0.0:8000"]

  database:
    image: docker.io/library/postgres:16-alpine
    expose:
      - "5432"
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=kamu
      - POSTGRES_PASSWORD=kamu
      - POSTGRES_DB=kamu
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U kamu"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  db-data:
```

### Usage

```bash
# Start development environment (web + database)
make dev

# Stop environment
make stop

# Run migrations
make migrate

# Create superuser
make createsuperuser

# Load seed data
make loaddata

# Run tests
make test

# Build container image
make build
```

## Containerfile (was Dockerfile)

```dockerfile
FROM ghcr.io/astral-sh/uv:python3.10-alpine AS build
WORKDIR /app

RUN apk add --no-cache postgresql-dev libffi-dev

ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never \
    UV_PYTHON=python3.10

COPY pyproject.toml requirements.lock ./
RUN uv venv && uv pip sync requirements.lock

COPY . /app

# Build Tailwind CSS
COPY static/css/input.css static/css/input.css
RUN ./tailwindcss -i static/css/input.css -o static/css/output.css --minify

RUN uv run manage.py collectstatic --noinput

FROM ghcr.io/astral-sh/uv:python3.10-alpine
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=build /app /app

RUN apk add --no-cache bind-tools postgresql-dev libffi-dev

EXPOSE 8000
ENTRYPOINT ["uv"]
CMD ["run", "gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "core.wsgi:application"]
```

## Makefile Targets (Target)

```makefile
COMPOSE := podman-compose -f compose.yml

# Container operations
build:
	$(COMPOSE) build

dev:
	$(COMPOSE) up web database

stop:
	$(COMPOSE) down

# Django management (via container)
migrate:
	$(COMPOSE) run --rm web run manage.py migrate

createsuperuser:
	$(COMPOSE) run --rm web run manage.py createsuperuser

loaddata:
	$(COMPOSE) run --rm web run manage.py loaddata dump_data/*.json

shell:
	$(COMPOSE) run --rm web run manage.py shell

# Testing
test:
	$(COMPOSE) run --rm web run manage.py test

test-coverage:
	$(COMPOSE) run --rm web sh -c "coverage run manage.py test && coverage report"

# Assets
tailwind-watch:
	./tailwindcss -i static/css/input.css -o static/css/output.css --watch

tailwind-build:
	./tailwindcss -i static/css/input.css -o static/css/output.css --minify

# Local development (without containers)
local-dev:
	python manage.py runserver 0.0.0.0:8000

local-test:
	DJANGO_SETTINGS_MODULE=core.settings.test python manage.py test
```

## Environment Variables

| Variable                   | Default                              | Description                        |
|---------------------------|--------------------------------------|------------------------------------|
| `DATABASE_URL`            | `postgres://kamu:kamu@localhost/kamu`| PostgreSQL connection string       |
| `DEBUG`                   | `false`                              | Django debug mode                  |
| `SECRET_KEY`              | (required in prod)                   | Django secret key                  |
| `DJANGO_SETTINGS_MODULE`  | `core.settings.dev`                  | Settings module                    |
| `ALLOWED_HOSTS`           | `*` (dev), required (prod)           | Allowed host headers               |
| `KAMU_ENABLE_ASYNC_TASKS` | `false`                              | Enable email notifications (sync) and overdue reminder command |
| `OKTA_METADATA_URL`       | (unset)                              | Okta SAML2 metadata URL            |
| `OKTA_ENTITY_ID`          | (unset)                              | Okta entity ID                     |
| `ANALYTICS_ACCOUNT_ID`    | (unset)                              | Google Analytics ID                |
| `SSL`                     | `true` (prod)                        | Enforce SSL redirects              |

## Migration from Docker

| Before (Docker)                | After (Podman)                        |
|-------------------------------|---------------------------------------|
| `Dockerfile`                  | `Containerfile`                       |
| `docker-compose.yml`         | `compose.yml` (with `podman-compose`)   |
| `docker build`               | `podman build`                        |
| `docker-compose up`          | `podman-compose up`                   |
| `docker-compose run`         | `podman-compose run`                  |
| `make docker-*`              | `make *` (no prefix)                  |

Podman reads both `Dockerfile` and `Containerfile`. We rename to
`Containerfile` for clarity and convention.
