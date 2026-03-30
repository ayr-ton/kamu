# User Stories

## Library Browsing

### US-001: View Available Libraries
**As a** logged-in user,
**I want to** see a list of all libraries,
**so that** I can choose which library to browse.

**Acceptance criteria:**
- Page shows all libraries with their names
- Each library links to its book listing
- Remembers my last visited library (redirect on next visit)

### US-002: Browse Books in a Library
**As a** logged-in user,
**I want to** see all books in a specific library,
**so that** I can find something to borrow.

**Acceptance criteria:**
- Shows book cover, title, author for each book
- Shows availability status (available / borrowed / missing)
- Paginated results (not infinite scroll)
- Page loads without full page reload when paginating (HTMX)

### US-003: Search Books
**As a** logged-in user,
**I want to** search books by title, author, or ISBN,
**so that** I can quickly find a specific book.

**Acceptance criteria:**
- Search input with debounced requests
- Results update without full page reload (HTMX)
- Searches across title, author, and ISBN fields
- Empty search shows all books

### US-004: View Book Details
**As a** logged-in user,
**I want to** see detailed information about a book,
**so that** I can decide whether to borrow it.

**Acceptance criteria:**
- Shows title, author, subtitle, description, cover image
- Shows publication info (publisher, date, pages, ISBN)
- Shows all copies and their status (available, who borrowed, borrow date)
- Shows appropriate action button (borrow / return / join waitlist / leave waitlist)

---

## Borrowing

### US-005: Borrow a Book
**As a** logged-in user,
**I want to** borrow an available book,
**so that** I can read it.

**Acceptance criteria:**
- "Borrow" button visible only when a copy is available
- After borrowing, button changes to "Return"
- Book shows as borrowed by me in the book detail
- Action updates without full page reload (HTMX)

### US-006: Return a Book
**As a** logged-in user,
**I want to** return a book I borrowed,
**so that** others can borrow it.

**Acceptance criteria:**
- "Return" button visible only for books I borrowed
- After returning, button changes to "Borrow" (if available) or "Join Waitlist"
- Waitlist notification sent if async tasks are enabled
- Action updates without full page reload (HTMX)

### US-007: View My Borrowed Books
**As a** logged-in user,
**I want to** see all books I currently have borrowed,
**so that** I can track what I need to return.

**Acceptance criteria:**
- Lists all books I have borrowed across all libraries
- Shows which library each book belongs to
- Each book links to its detail page

---

## Waitlist

### US-008: Join Waitlist
**As a** logged-in user,
**I want to** join the waitlist for an unavailable book,
**so that** I get notified when it becomes available.

**Acceptance criteria:**
- "Join Waitlist" button visible when no copies are available and I haven't borrowed it
- After joining, button changes to "Leave Waitlist"
- Cannot join waitlist twice for the same book/library
- Notification sent to current borrower (if async tasks enabled)

### US-009: Leave Waitlist
**As a** logged-in user,
**I want to** leave a waitlist I previously joined,
**so that** I no longer receive notifications for that book.

**Acceptance criteria:**
- "Leave Waitlist" button visible when I'm on the waitlist
- After leaving, button changes to "Join Waitlist"

### US-010: View My Waitlist
**As a** logged-in user,
**I want to** see all books I'm waiting for,
**so that** I can track my waitlist status.

**Acceptance criteria:**
- Lists all books I'm on the waitlist for
- Shows which library and when I joined
- Each book links to its detail page

---

## Administration

### US-011: Add Book via ISBN
**As an** admin,
**I want to** add a book by entering its ISBN,
**so that** book details are auto-filled from Google Books.

**Acceptance criteria:**
- ISBN form in Django admin
- Fetches title, author, description, cover, etc. from Google Books API
- Pre-fills the book creation form with fetched data
- Shows warning if book already exists or ISBN not found

### US-012: Report Book as Missing
**As an** admin,
**I want to** mark a book copy as missing,
**so that** it's no longer shown as available.

**Acceptance criteria:**
- Admin action to mark a copy as missing
- Missing books are not available for borrowing

### US-013: Report Book as Found
**As an** admin,
**I want to** mark a previously missing book as found,
**so that** it becomes available again.

**Acceptance criteria:**
- Admin action to mark a copy as found
- Book becomes available for borrowing

### US-014: Export Book Data
**As an** admin,
**I want to** export book copy data,
**so that** I can analyze library usage.

**Acceptance criteria:**
- Export via django-import-export in admin

---

## User Experience

### US-015: Theme Toggle
**As a** logged-in user,
**I want to** switch between light and dark themes,
**so that** I can use the app comfortably in different lighting.

**Acceptance criteria:**
- Toggle in the header
- Preference persisted in localStorage
- Theme applies immediately without page reload (petite-vue)
- Tailwind CSS dark mode classes used

### US-016: Authentication
**As a** user,
**I want to** log in to access the library,
**so that** my borrowing history is tracked.

**Acceptance criteria:**
- Django login form (default)
- Okta SAML2 login (when configured)
- All pages require authentication
- Redirect to login page when not authenticated

---

## Notifications (Behind Feature Toggle)

### US-017: Waitlist Book Available Notification
**As a** user on a waitlist,
**I want to** receive an email when the book becomes available,
**so that** I can borrow it.

**Acceptance criteria:**
- Email sent when a book is returned and users are on the waitlist
- Only works when `KAMU_ENABLE_ASYNC_TASKS=True`
- Silently skipped when toggle is off

### US-018: Overdue Borrow Reminder
**As a** user who has borrowed a book for too long,
**I want to** receive a reminder email,
**so that** I remember to return the book.

**Acceptance criteria:**
- Email sent when borrow exceeds configured max term (3 months)
- Only works when `KAMU_ENABLE_ASYNC_TASKS=True`
- Silently skipped when toggle is off

### US-019: New Waitlist User Notification
**As a** user who borrowed a book,
**I want to** know when someone joins the waitlist for my book,
**so that** I'm aware others want to read it.

**Acceptance criteria:**
- Email sent to the borrower when someone joins the waitlist
- Only works when `KAMU_ENABLE_ASYNC_TASKS=True`
- Silently skipped when toggle is off
