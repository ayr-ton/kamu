 'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', function($scope, BookService) {

  $scope.searchCriteria = '';

  var initializeControls = function() {
      $scope.formShowable  = false;
      $scope.errorShowable = false;
      $scope.searchShowable = true;
      $scope.isbnSearch = true;
    };
  initializeControls();

  $scope.autoCompleteSearch = initializeControls;

  $scope.findGoogleBooks = function() {
      var searchCriteria = $scope.searchCriteria.toString();

      $scope.book = {};

      if (searchCriteria !== '') {
        BookService.findLibraryBook(searchCriteria).
          success(populateBookFromLibraryApi).
          error(function() {
              toggleFormDisplay(false);
            });
      }   
    };

  $scope.addManually = function() {
      $scope.book = {};
      $scope.searchShowable = false;
      $scope.isbnSearch = false;

      toggleFormDisplay(true);
    };

  $scope.addBookToLibrary = function() {
      var libraryId = 50;

      BookService.findLibrary(libraryId).
        success(function(data) {
          var library = data._links.self.href;

          if (!$scope.bookExistsInTheLibrary) {
            addBook(library);
          } else {
            var book = $scope.book._links.self.href;
            addCopy(library, book);
          }
        });
    };

  var populateBookFromLibraryApi = function(data) {
      $scope.bookExistsInTheLibrary = false;

      if (data._embedded !== undefined) {
        $scope.book = data._embedded.books[0];
        $scope.book.imageUrl = BookService.resolveBookImage($scope.book.imageUrl);
        $scope.bookExistsInTheLibrary = true;

        toggleFormDisplay(true);
      } else {
        BookService.findGoogleBooks($scope.searchCriteria).
          success(populateBookFromGoogleApi).
          error(function () {
            toggleFormDisplay(false);
          });
      }
    };

  var populateBookFromGoogleApi = function (data) {
      $scope.formShowable  = false;

      angular.forEach(data.items, function (item) {
          $scope.formShowable  = true;

          $scope.book = BookService.extractBookInformation(item.volumeInfo, $scope.searchCriteria);
        });

      if($scope.book.title === undefined) {
        $scope.formShowable = false;
      }

      $scope.errorShowable = !$scope.formShowable;
    };

  function addCopy(library, book) {
    var addCopyRequest = {};
    addCopyRequest.status = 'AVAILABLE';
    addCopyRequest.library = library;
    addCopyRequest.book = book;

    BookService.addCopy(addCopyRequest).
      success(function() {
        window.alert('Book has been added to library successfully.');
      }).
      error(function(){
        window.alert('Error occurred while adding ' + $scope.book.title + '.');
      });
  }

  function addBook(library) {
    BookService.addBook($scope.book).
      success(function(data, status, headers, config) {
        var book = headers('Location');

        addCopy(library, book);
      }).
      error(function(){
        window.alert('Error occurred while adding ' + $scope.book.title + '.');
      });
  }

  function toggleFormDisplay(displayable) {
    $scope.formShowable = displayable;
    $scope.errorShowable = !displayable;
  }
});