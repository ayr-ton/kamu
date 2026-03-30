# TDD Workflow

## Cycle

Every feature and refactor follows this loop:

```
1. PLAN    → Define what to build (write or update spec)
2. VALIDATE → Review the plan with the developer
3. TEST    → Write failing tests that describe the expected behavior
4. RED     → Run tests, confirm they fail for the right reason
5. GREEN   → Write the minimum code to make tests pass
6. REFACTOR → Clean up while keeping tests green
7. MANUAL  → Developer performs manual verification (when applicable)
```

## Rules

1. **Never write production code without a failing test first.**
   Exception: pure configuration files (settings, Dockerfile, CI config).

2. **Tests describe behavior, not implementation.**
   Test what the user sees (HTTP responses, HTML content, redirects), not
   internal method calls.

3. **One test, one assertion focus.**
   Each test should verify one behavior. Multiple assertions are fine if they
   verify the same logical outcome.

4. **Use Django's test client for view tests.**
   All view tests use `self.client.get()` / `self.client.post()` and assert
   on response status, content, and templates used.

5. **HTMX fragment tests check for `HX-Request` header handling.**
   Views should return full pages for normal requests and HTML fragments for
   HTMX requests. Tests verify both paths.

## Test Organization

```
books/
  test/
    test_models.py      # Model logic: borrow, return, availability, waitlist
    test_views.py       # View responses: status codes, templates, content
    test_forms.py       # Form validation
    test_google.py      # Google Books API integration

waitlist/
  test/
    test_models.py      # WaitlistItem creation, constraints
    test_views.py       # Waitlist join/leave/status views
    test_tasks.py       # Email notification behavior

core/
  test/
    test_feature_toggles.py  # Feature toggle behavior
```

## Test Patterns

### View Test (Full Page)

```python
def test_library_list_returns_libraries(self):
    Library.objects.create(name="Quito", slug="quito")
    response = self.client.get("/")
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, "Quito")
    self.assertTemplateUsed(response, "books/library_list.html")
```

### View Test (HTMX Fragment)

```python
def test_book_list_returns_fragment_for_htmx(self):
    response = self.client.get(
        "/libraries/quito/books/",
        HTTP_HX_REQUEST="true",
    )
    self.assertEqual(response.status_code, 200)
    self.assertTemplateUsed(response, "books/partials/book_list.html")
    self.assertNotContains(response, "<html")
```

### Model Test

```python
def test_borrow_marks_copy_as_borrowed(self):
    self.book.borrow(user=self.user, library=self.library)
    copy = BookCopy.objects.get(book=self.book, library=self.library)
    self.assertEqual(copy.user, self.user)
    self.assertIsNotNone(copy.borrow_date)
```

### Feature Toggle Test

```python
@override_settings(KAMU_ENABLE_ASYNC_TASKS=False)
def test_return_book_skips_notification_when_toggle_off(self):
    self.book.return_to_library(user=self.user, library=self.library)
    self.assertFalse(mock_send_notification.called)
```

## Running Tests

```bash
# All tests
python manage.py test

# Specific app
python manage.py test books
python manage.py test waitlist

# With coverage
coverage run manage.py test
coverage report
coverage html
```

## Manual Test Tasks

After completing each migration phase, manual test tasks are created for the
developer. These follow this format:

```markdown
### Manual Test: [Feature Name]
- [ ] Start local environment: `podman-compose up`
- [ ] Navigate to [URL]
- [ ] Verify [expected behavior]
- [ ] Test with Okta auth enabled (if applicable)
- [ ] Report results back to the AI agent
```

Manual tests are tracked in `AGENTS.md` under the current phase.

## When to Skip TDD

- Podman/container configuration files
- CI/CD pipeline definitions (GitHub Actions)
- Tailwind CSS configuration
- Static asset vendoring (copying HTMX/petite-vue JS files)
- Documentation updates

These are verified by running the system, not by unit tests.
