.PHONY: build dev stop migrate createsuperuser loaddata shell test test-coverage local-dev local-test backend-deps tailwind-image tailwind-build tailwind-watch prod

COMPOSE := podman-compose -f compose.yml

# Tailwind CSS (via container)
TAILWIND_IMAGE := localhost/kamu-tailwind:dev
TAILWIND_VOLUMES := -v ./static:/app/static -v ./core/templates:/app/core/templates -v ./books/templates:/app/books/templates -v ./waitlist/templates:/app/waitlist/templates

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

# Testing (via container)
test:
	$(COMPOSE) run --rm web run manage.py test

test-coverage:
	$(COMPOSE) run --rm web sh -c "coverage run manage.py test && coverage report"

# Local development (without containers)
local-dev:
	DJANGO_SETTINGS_MODULE=core.settings.dev uv run manage.py runserver 0.0.0.0:8000

local-test:
	DJANGO_SETTINGS_MODULE=core.settings.test uv run manage.py test

local-test-coverage:
	DJANGO_SETTINGS_MODULE=core.settings.test uv run coverage run manage.py test && uv run coverage report

# Dependencies
backend-deps:
	uv pip compile pyproject.toml -o requirements.lock
	uv pip sync requirements.lock

# Tailwind steps
tailwind-image:
	podman build --target tailwind -t $(TAILWIND_IMAGE) -f Containerfile .

tailwind-build: tailwind-image
	podman run --rm -w /app $(TAILWIND_VOLUMES) $(TAILWIND_IMAGE) tailwindcss -i static/css/input.css -o static/css/output.css --minify

tailwind-watch: tailwind-image
	podman run --rm -w /app $(TAILWIND_VOLUMES) $(TAILWIND_IMAGE) tailwindcss -i static/css/input.css -o static/css/output.css --watch --poll

# Production
prod:
	uv run manage.py migrate
	uv run manage.py collectstatic --noinput
