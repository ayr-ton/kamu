'use strict';

angular
  .module('libraryUiApp')
  .service('NavigationService', ["$route", function ($route) {

    this.settings = "views/settings/settings.html";
    this.addBook = "views/book/add-book.html";
    this.allBooks = "views/book/index.html";
    this.wishlist = "views/book/wishlist.html";
    this.borrowedBooks = "views/book/borrowed-books.html";

    this.bookDetails = "views/book/book-details.html";
    this.currentBookList = this.allBooks;

    this.goBack = function () {
      window.history.back();
    };

    this.getCurrentPage = function () {
      var page = "";
      if ($route && $route.current) {
        page = $route.current.loadedTemplateUrl;
        this.setCurrentBookList(page);
        if (page == this.bookDetails) {
          page = this.currentBookList;
        }
      }
      return page;
    };

    this.setCurrentBookList = function (page) {
      if (page == this.allBooks) {
        this.currentBookList = this.allBooks;
      } else if (page == this.wishlist) {
        this.currentBookList = this.wishlist;
      } else if (page == this.borrowedBooks) {
        this.currentBookList = this.borrowedBooks;
      }
    };

    this.isSettingsActive = function () {
      return this.getCurrentPage() == this.settings;
    };

    this.isAddBookActive = function () {
      return this.getCurrentPage() == this.addBook;
    };

    this.isAllBooksActive = function () {
      return this.getCurrentPage() == this.allBooks;
    };

    this.isWishlistActive = function () {
      return this.getCurrentPage() == this.wishlist;
    };

    this.isBorrowedBooksActive = function () {
      return this.getCurrentPage() == this.borrowedBooks;
    };

  }]);
