# Database Schema

## Overview

PostgreSQL is used in all environments (development, test, production).
Local development runs PostgreSQL via podman-compose.

The schema is managed by Django migrations. No direct SQL is used.

## Entity Relationship Diagram

```
┌──────────────────────────┐
│       auth_user          │
│ (Django built-in)        │
├──────────────────────────┤
│ id          PK           │
│ username    varchar(150)  │
│ email       varchar(254)  │
│ first_name  varchar(150)  │
│ last_name   varchar(150)  │
│ password    varchar(128)  │
│ is_staff    boolean       │
│ is_active   boolean       │
│ ...                      │
└──────────┬───────────────┘
           │
           │ borrowed by (nullable FK)
           ▼
┌──────────────────────────┐       ┌──────────────────────────┐
│       books_bookcopy     │       │     books_library        │
├──────────────────────────┤       ├──────────────────────────┤
│ id          PK           │       │ id          PK           │
│ book_id     FK ──────────┼──┐    │ name        varchar(255) │
│ library_id  FK ──────────┼──┼──▶ │ slug        varchar(255) │
│ user_id     FK (nullable)│  │    └──────────────────────────┘
│ borrow_date date (null)  │  │
│ missing     boolean      │  │
└──────────────────────────┘  │
                              │
           ┌──────────────────┘
           ▼
┌──────────────────────────┐
│       books_book         │
├──────────────────────────┤
│ id               PK      │
│ author           varchar(255) │
│ title            varchar(255) │
│ subtitle         varchar(255) NULL │
│ description      text NULL    │
│ image_url        text NULL    │
│ isbn             varchar(255) NULL │
│ number_of_pages  integer NULL │
│ publication_date date NULL    │
│ publisher        varchar(255) NULL │
└──────────┬───────────────┘
           │
           │ waitlist for (FK)
           ▼
┌──────────────────────────────────┐
│     waitlist_waitlistitem        │
├──────────────────────────────────┤
│ id          PK                   │
│ book_id     FK → books_book      │
│ library_id  FK → books_library   │
│ user_id     FK → auth_user       │
│ added_date  datetime             │
├──────────────────────────────────┤
│ UNIQUE (book_id, library_id,     │
│         user_id)                 │
└──────────────────────────────────┘
```

## Tables

### books_book

| Column           | Type         | Nullable | Notes                   |
|------------------|-------------|----------|-------------------------|
| id               | integer PK  | No       | Auto-increment          |
| author           | varchar(255)| No       |                         |
| title            | varchar(255)| No       |                         |
| subtitle         | varchar(255)| Yes      |                         |
| description      | text        | Yes      |                         |
| image_url        | text        | Yes      | Google Books cover URL  |
| isbn             | varchar(255)| Yes      |                         |
| number_of_pages  | integer     | Yes      |                         |
| publication_date | date        | Yes      |                         |
| publisher        | varchar(255)| Yes      |                         |

### books_library

| Column | Type         | Nullable | Notes          |
|--------|-------------|----------|----------------|
| id     | integer PK  | No       | Auto-increment |
| name   | varchar(255)| No       |                |
| slug   | varchar(255)| No       | URL identifier |

### books_bookcopy

| Column      | Type        | Nullable | Notes                          |
|-------------|------------|----------|--------------------------------|
| id          | integer PK | No       | Auto-increment                 |
| book_id     | integer FK | No       | → books_book                   |
| library_id  | integer FK | No       | → books_library                |
| user_id     | integer FK | Yes      | → auth_user (null = available) |
| borrow_date | date       | Yes      | null when not borrowed         |
| missing     | boolean    | No       | default False                  |

A book copy with `user_id = NULL` is available for borrowing.
A book copy with `missing = True` is not shown as available.

### waitlist_waitlistitem

| Column     | Type         | Nullable | Notes                                |
|------------|-------------|----------|--------------------------------------|
| id         | integer PK  | No       | Auto-increment                       |
| book_id    | integer FK  | No       | → books_book                         |
| library_id | integer FK  | No       | → books_library                      |
| user_id    | integer FK  | No       | → auth_user                          |
| added_date | datetime    | No       |                                      |

**Constraint:** `UNIQUE(book_id, library_id, user_id)` — a user can only be
on the waitlist once per book per library.

## Relationships

- **Library ↔ Book**: Many-to-many through `BookCopy`
- **Library ↔ Book (waitlist)**: Many-to-many through `WaitlistItem`
- **BookCopy → User**: Optional FK (null means available)
- **WaitlistItem → User**: Required FK

## Database Configuration

### Development (podman-compose)

```python
# via DATABASE_URL environment variable
DATABASES = {
    "default": dj_database_url.config(
        default="postgres://kamu:kamu@localhost:5432/kamu"
    )
}
```

### Test

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "kamu_test",
        "USER": "kamu",
        "PASSWORD": "kamu",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

### Production

```python
# DATABASE_URL set by hosting environment
DATABASES = {
    "default": dj_database_url.config()
}
```

## Migrations

Current migration state:
- `books`: 10 migrations (0001_initial through 0010_bookcopy_missing)
- `waitlist`: 2 migrations (0001_initial, 0002_alter_waitlistitem_add_unique_constraint)

No schema changes are planned as part of the modernization. The data model
is stable and well-structured.

## Seed Data

Initial data is loaded from `dump_data/*.json` fixtures:
```bash
python manage.py loaddata dump_data/*.json
```
