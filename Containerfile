FROM debian:bookworm-slim AS tailwind
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && ARCH=$(uname -m) \
    && case "$ARCH" in x86_64) ARCH=x64 ;; aarch64) ARCH=arm64 ;; esac \
    && curl -sLO "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-${ARCH}" \
    && chmod +x "tailwindcss-linux-${ARCH}" \
    && mv "tailwindcss-linux-${ARCH}" /usr/local/bin/tailwindcss \
    && apt-get purge -y curl && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

FROM tailwind AS build-tailwind
COPY static/css/input.css static/css/
COPY core/templates/ core/templates/
COPY books/templates/ books/templates/
COPY waitlist/templates/ waitlist/templates/
RUN tailwindcss -i static/css/input.css -o static/css/output.css --minify

FROM ghcr.io/astral-sh/uv:python3.12-alpine AS build
WORKDIR /app

RUN apk add --no-cache postgresql-dev libffi-dev

ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never \
    UV_PYTHON=python3.12

COPY pyproject.toml requirements.lock ./
RUN uv venv && uv pip sync requirements.lock

COPY . /app
COPY --from=build-tailwind /app/static/css/output.css /app/static/css/output.css

RUN uv run manage.py collectstatic --noinput


FROM ghcr.io/astral-sh/uv:python3.12-alpine
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=build /app /app

RUN apk add --no-cache bind-tools postgresql-dev libffi-dev xmlsec

EXPOSE 8000
ENTRYPOINT ["uv"]
CMD ["run", "gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "core.wsgi:application"]
