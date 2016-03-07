'use strict';

angular
  .module('libraryUiApp')
  .controller('AddBookController', ['$scope', '$route', '$translate', 'BookService', 'toastr', function ($scope, $route, $translate, BookService, toastr) {

    $scope.addingBook = false;
    $scope.isGoogleBook = false;
    $scope.searchCriteria = '';

    $scope.autoCompleteSearch = function () {
      $scope.formShowable = false;
      $scope.errorShowable = false;
      $scope.searchShowable = true;
      $scope.isbnSearch = true;
    };
    $scope.autoCompleteSearch();

    function toggleFormDisplay(displayable) {
      $scope.formShowable = displayable;
      $scope.errorShowable = !displayable;
    }

    $scope.addManually = function () {
      $scope.book = {};
      $scope.searchShowable = false;
      $scope.isbnSearch = false;
      $scope.isGoogleBook = false;
      toggleFormDisplay(true);
    };

    function populateBookFromGoogleApi(data) {
      angular.forEach(data.items, function (item) {
        $scope.book = BookService.extractBookInformation(item.volumeInfo, $scope.searchCriteria);
        $scope.isGoogleBook = true;
      });

      var formDisplay = $scope.book.title !== undefined;
      toggleFormDisplay(formDisplay);

      if (!formDisplay) {
        $scope.addManually();
        $scope.errorShowable = !formDisplay;
      }
    }

    function populateBookFromLibraryApi(data) {
      $scope.bookExistsInTheLibrary = false;

      if (data._embedded !== undefined) {
        $scope.book = data._embedded.books[0];
        $scope.book.imageUrl = BookService.resolveBookImage($scope.book.imageUrl);
        $scope.bookExistsInTheLibrary = true;
        $scope.isGoogleBook = true;

        toggleFormDisplay(true);
      } else {
        BookService.findGoogleBooks($scope.searchCriteria).
          success(populateBookFromGoogleApi).
          error(function () {
            toggleFormDisplay(false);
          });
      }
    }

    $scope.findGoogleBooks = function () {
      var searchCriteria = $scope.searchCriteria.toString();

      $scope.book = {};

      if (searchCriteria !== '') {
        BookService.findLibraryBook(searchCriteria).
          success(populateBookFromLibraryApi).
          error(function () {
            toggleFormDisplay(false);
          });
      }
    };

    function getLibrarySlug() {
      return $route.current.pathParams.library;
    }

    function addCopy(library, slug, book) {
      var addCopyRequest = {};
      addCopyRequest.status = 'AVAILABLE';
      addCopyRequest.library = library;
      addCopyRequest.book = book;

      BookService.addCopy(addCopyRequest).
        success(function () {
          $scope.addingBook = false;

          toastr.success('Book has been added to library successfully.');
          window.location.replace('/#/library/' + slug);
        }).
        error(function () {
          toastr.error('Error occurred while adding ' + $scope.book.title + '.');
          $scope.addingBook = false;
        });
    }

    function addBook(library, slug) {
      BookService.addBook($scope.book).
        success(function (data, status, headers) {
          var book = headers('Location');
          addCopy(library, slug, book);
        }).
        error(function () {
          toastr.error('Error occurred while adding ' + $scope.book.title + '.');
          $scope.addingBook = false;
        });
    }

    $scope.addBookToLibrary = function () {
      var slug = getLibrarySlug();
      $scope.addingBook = true;

      BookService.getLibraryBySlug(slug).
        success(function (data) {
          if (angular.isDefined(data._embedded)) {
            var library = data._embedded.libraries[0]._links.self.href;

            if (!$scope.bookExistsInTheLibrary) {
              addBook(library, slug);
            } else {
              var book = $scope.book._links.self.href;
              addCopy(library, slug, book);
            }
          } else {
            toastr.error($translate.instant('INVALID_LIBRARY_ERROR'));
          }
        });
    };

  }]);
