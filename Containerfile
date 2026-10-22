
services:
  db:
    image: postgres:17
    container_name: django-pro-db
    restart: unless-stopped

    env_file:
      - .env

    environment:
      POSTGRES_DB: ${POSTGRES_DB:?Defina POSTGRES_DB no .env}
      POSTGRES_USER: ${POSTGRES_USER:?Defina POSTGRES_USER no .env}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Defina POSTGRES_PASSWORD no .env}

    volumes:
      - postgres_data:/var/lib/postgresql/data

    healthcheck:
      test:
        - CMD-SHELL
        - pg_isready -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 15s

    networks:
      - backend

  web:
    build:
      context: .
      dockerfile: Containerfile
      target: production

    container_name: django-pro-web
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
        - >-
          import urllib.request;
          urllib.request.urlopen(
          'http://127.0.0.1:8000/health/',
          timeout=3
          )
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

    container_name: django-pro-nginx
    restart: unless-stopped
    init: true

    ports:
      - "80:80"

    depends_on:
      web:
        condition: service_healthy

    healthcheck:
      test:
        - CMD
        - wget
        - -q
        - -O
        - /dev/null
        - http://127.0.0.1/health/
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

    networks:
      - backend

networks:
  backend:
    driver: bridge

volumes:
  postgres_data:
    driver: local
