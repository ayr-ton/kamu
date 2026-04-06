from django.urls import path

from books import views

urlpatterns = [
    path("", views.book_list, name="book-list"),
    path("add-book/", views.add_book, name="add-book"),
    path("add-book/lookup/", views.isbn_lookup, name="isbn-lookup"),
    path("add-book/confirm/", views.add_book_confirm, name="add-book-confirm"),
    path("books/<int:pk>/", views.book_detail, name="book-detail"),
    path("books/<int:pk>/borrow/", views.borrow_book, name="borrow-book"),
    path("books/<int:pk>/return/", views.return_book, name="return-book"),
    path("books/<int:pk>/waitlist/join/", views.join_waitlist, name="join-waitlist"),
    path("books/<int:pk>/waitlist/leave/", views.leave_waitlist, name="leave-waitlist"),
]
