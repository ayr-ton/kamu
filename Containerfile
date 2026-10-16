from pathlib import Path
import zipfile, textwrap, os

root = Path("/mnt/data/django-pro-ultra")
files = {
"pyproject.toml": r'''[project]
name = "django-pro-ultra"
version = "1.0.0"
description = "Django com PostgreSQL, Tailwind CSS, Nginx e CI"
requires-python = ">=3.12,<3.13"
dependencies = [
    "Django>=5.2,<5.3",
    "gunicorn>=23,<24",
    "psycopg[binary]>=3.2,<4",
]

[dependency-groups]
dev = [
    "pytest>=8,<9",
    "pytest-django>=4.9,<5",
]

[tool.uv]
package = false

[tool.pytest.ini_options]
DJANGO_SETTINGS_MODULE = "config.settings"
python_files = ["test_*.py", "tests.py"]
addopts = "-ra"
''',
"manage.py": r'''#!/usr/bin/env python
import os
import sys


def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
''',
"config/__init__.py": "",
"config/settings.py": r'''import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


def env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def env_list(name: str, default: str = "") -> list[str]:
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "unsafe-development-key-change-before-deploy")
DEBUG = env_bool("DJANGO_DEBUG", False)

ALLOWED_HOSTS = env_list(
    "DJANGO_ALLOWED_HOSTS",
    "localhost,127.0.0.1,[::1]",
)
CSRF_TRUSTED_ORIGINS = env_list("DJANGO_CSRF_TRUSTED_ORIGINS")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "health",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

if env_bool("DJANGO_TEST_SQLITE", False):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("POSTGRES_DB", "django_pro"),
            "USER": os.getenv("POSTGRES_USER", "django_user"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD", ""),
            "HOST": os.getenv("POSTGRES_HOST", "localhost"),
            "PORT": os.getenv("POSTGRES_PORT", "5432"),
            "CONN_MAX_AGE": 60,
            "OPTIONS": {"connect_timeout": 5},
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"] if (BASE_DIR / "static").is_dir() else []

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"
SESSION_COOKIE_HTTPONLY = True

if not DEBUG:
    SESSION_COOKIE_SECURE = env_bool("DJANGO_SESSION_COOKIE_SECURE", True)
    CSRF_COOKIE_SECURE = env_bool("DJANGO_CSRF_COOKIE_SECURE", True)
    SECURE_SSL_REDIRECT = env_bool("DJANGO_SECURE_SSL_REDIRECT", False)

if env_bool("DJANGO_USE_HTTPS_PROXY", False):
    # Só habilite se o proxy confiável sobrescrever X-Forwarded-Proto.
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
''',
"config/urls.py": r'''from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", include("health.urls")),
]
''',
"config/wsgi.py": r'''import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_wsgi_application()
''',
"config/asgi.py": r'''import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_asgi_application()
''',
"health/__init__.py": "",
"health/urls.py": r'''from django.http import JsonResponse
from django.urls import path


def health_check(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("", health_check, name="health-check"),
]
''',
"health/tests.py": r'''from django.test import TestCase
from django.urls import reverse


class HealthCheckTests(TestCase):
    def test_endpoint_returns_http_200(self):
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response.status_code, 200)

    def test_endpoint_returns_expected_json(self):
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response.json(), {"status": "ok"})

    def test_endpoint_returns_json_content_type(self):
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response.headers["Content-Type"], "application/json")
''',
"templates/base.html": r'''{% load static %}
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{% block title %}Django PRO ULTRA{% endblock %}</title>
    <link rel="stylesheet" href="{% static 'css/output.css' %}">
  </head>
  <body>
    <main class="container-pro py-10">
      {% block content %}
      <section class="card-pro">
        <h1 class="text-3xl font-bold">Django PRO ULTRA</h1>
        <p class="mt-3 text-slate-300">Django, PostgreSQL, Tailwind CSS e Nginx.</p>
      </section>
      {% endblock %}
    </main>
  </body>
</html>
''',
"static/src/input.css": r'''@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply min-h-screen bg-slate-950 text-slate-100 antialiased;
  }
}

@layer components {
  .container-pro {
    @apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .card-pro {
    @apply rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl;
  }

  .button-pro {
    @apply inline-flex items-center justify-center rounded-lg bg-indigo-600
      px-4 py-2 font-semibold text-white transition hover:bg-indigo-500
      focus:outline-none focus:ring-2 focus:ring-indigo-400;
  }
}
''',
"package.json": r'''{
  "name": "django-pro-ultra-assets",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tailwindcss -i ./static/src/input.css -o ./static/css/output.css --minify"
  },
  "devDependencies": {
    "tailwindcss": "3.4.17"
  }
}
''',
"tailwind.config.js": r'''/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./health/**/*.py",
    "./config/**/*.py",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
''',
"nginx/default.conf": r'''upstream django_app {
    server web:8000;
    keepalive 16;
}

server {
    listen 80;
    server_name _;
    server_tokens off;
    client_max_body_size 10m;

    location /static/ {
        alias /usr/share/nginx/html/static/;
        access_log off;
        expires 1h;
        add_header Cache-Control "public";
        add_header X-Content-Type-Options "nosniff" always;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://django_app;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
''',
"Containerfile": r'''# syntax=docker/dockerfile:1

# ============================================================
# 1. PYTHON + UV
# ============================================================
FROM python:3.12-slim AS uv

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PROJECT_ENVIRONMENT=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:0.8.22 /uv /uvx /usr/local/bin/

# ============================================================
# 2. DEPENDÊNCIAS DE PRODUÇÃO
# ============================================================
FROM uv AS dependencies

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

# ============================================================
# 3. TAILWIND CSS
# ============================================================
FROM node:22-alpine AS assets

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && test -s static/css/output.css

# ============================================================
# 4. TESTES DA IMAGEM
# ============================================================
FROM uv AS test

ENV DJANGO_SETTINGS_MODULE=config.settings \
    DJANGO_DEBUG=false \
    DJANGO_ALLOWED_HOSTS=localhost \
    DJANGO_TEST_SQLITE=1

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project

COPY . .
RUN uv sync --frozen

RUN DJANGO_SECRET_KEY=build-only-test-key \
    python manage.py check \
    && DJANGO_SECRET_KEY=build-only-test-key \
       python manage.py test \
    && touch /tmp/test-success

# ============================================================
# 5. PRODUÇÃO DJANGO + GUNICORN
# ============================================================
FROM dependencies AS production

ENV DJANGO_SETTINGS_MODULE=config.settings \
    DJANGO_DEBUG=false \
    DJANGO_ALLOWED_HOSTS=localhost \
    PORT=8000 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Cria usuário e grupo antes de COPY --chown.
RUN groupadd --system app \
    && useradd --system --gid app --home-dir /app --no-create-home app

COPY --chown=app:app . .
COPY --from=assets --chown=app:app /app/static/css/output.css /app/static/css/output.css

RUN DJANGO_SECRET_KEY=build-only-collectstatic-key \
    python manage.py collectstatic --noinput \
    && chown -R app:app /app

# Obriga o estágio de teste a fazer parte do grafo de build.
COPY --from=test /tmp/test-success /tmp/test-success

USER app
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD python -c "import os, urllib.request; urllib.request.urlopen('http://127.0.0.1:' + os.getenv('PORT', '8000') + '/health/', timeout=3).read()" || exit 1

CMD ["sh", "-c", "exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT} --workers 2 --access-logfile - --error-logfile -"]

# ============================================================
# 6. NGINX: PROXY REVERSO + ARQUIVOS ESTÁTICOS
# ============================================================
FROM nginx:1.28-alpine AS nginx

COPY --from=production /app/staticfiles/ /usr/share/nginx/html/static/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
RUN nginx -t
''',
"compose.yaml": r'''services:
  db:
    image: postgres:17
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB:?Configure POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER:?Configure POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Configure POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \"$$POSTGRES_USER\" -d \"$$POSTGRES_DB\""]
      interval: 5s
      timeout: 5s
      retries: 10
      start_period: 10s
    networks:
      - backend

  web:
    build:
      context: .
      dockerfile: Containerfile
      target: production
    restart: unless-stopped
    init: true
    env_file:
      - .env
    environment:
      POSTGRES_HOST: db
      POSTGRES_PORT: "5432"
    expose:
      - "8000"
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test:
        - CMD
        - python
        - -c
        - "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health/', timeout=3)"
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 20s
    networks:
      - backend

  nginx:
    build:
      context: .
      dockerfile: Containerfile
      target: nginx
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      web:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "-q", "-O", "/dev/null", "http://127.0.0.1/health/"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
    networks:
      - backend

volumes:
  postgres_data:

networks:
  backend:
''',
".dockerignore": r'''.git/
.github/
.venv/
venv/
node_modules/
__pycache__/
*.py[cod]
.pytest_cache/
.mypy_cache/
.ruff_cache/
.coverage
htmlcov/
.env
.env.*
!.env.example
staticfiles/
media/
*.log
db.sqlite3
dist/
build/
*.egg-info/
''',
".env.example": r'''# Gere uma chave exclusiva para cada ambiente.
DJANGO_SECRET_KEY=replace-with-a-long-random-secret
DJANGO_DEBUG=false
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_CSRF_TRUSTED_ORIGINS=
DJANGO_SECURE_SSL_REDIRECT=false
DJANGO_SESSION_COOKIE_SECURE=true
DJANGO_CSRF_COOKIE_SECURE=true
DJANGO_USE_HTTPS_PROXY=false

POSTGRES_DB=django_pro
POSTGRES_USER=django_user
POSTGRES_PASSWORD=replace-with-a-strong-password
POSTGRES_HOST=db
POSTGRES_PORT=5432
''',
".github/workflows/ci.yml": r'''name: Django PRO ULTRA CI

on:
  push:
    branches: [main, master]
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  test:
    name: Django + PostgreSQL + Tailwind + Docker
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_DB: django_pro_test
          POSTGRES_USER: django_user
          POSTGRES_PASSWORD: ci-password
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U django_user -d django_pro_test"
          --health-interval 5s
          --health-timeout 5s
          --health-retries 10

    env:
      DJANGO_SECRET_KEY: ci-only-secret-key-not-for-production
      DJANGO_DEBUG: "false"
      DJANGO_ALLOWED_HOSTS: localhost,127.0.0.1
      DJANGO_TEST_SQLITE: "false"
      POSTGRES_DB: django_pro_test
      POSTGRES_USER: django_user
      POSTGRES_PASSWORD: ci-password
      POSTGRES_HOST: 127.0.0.1
      POSTGRES_PORT: "5432"

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install uv
        uses: astral-sh/setup-uv@v6
          # Cache is keyed from uv.lock when the lockfile exists.
        with:
          enable-cache: true

      - name: Install Python dependencies
        run: uv sync --frozen

      - name: Django system check
        run: uv run python manage.py check

      - name: FIRST tests against PostgreSQL
        run: uv run python manage.py test

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm

      - name: Install Tailwind dependencies
        run: npm ci

      - name: Build Tailwind CSS
        run: |
          npm run build
          test -s static/css/output.css

      - name: Build Docker image
        run: docker build --no-cache -f Containerfile -t django-pro-ultra:ci .
''',
"README.md": r'''# Django PRO ULTRA

Django 5.2, PostgreSQL 17, Tailwind CSS 3, Gunicorn, Nginx e GitHub Actions.

## Requisitos

- Python 3.12
- `uv`
- Node.js 22 + npm
- Docker Engine com Docker Compose

## Preparar lockfiles

O repositório deve versionar `uv.lock` e `package-lock.json`. Gere-os na primeira configuração:

```bash
uv lock
uv sync --frozen
npm install
npm run build
git add uv.lock package-lock.json