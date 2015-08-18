 'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', ['$scope', 'BookService', 'modals', function($scope, BookService, modals) {

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

    $scope.listBooks = function() {
        
        $scope.copies = [];

        BookService.listBooks()
          .success(function (data) {
            if (data._embedded.copies !== undefined) {
              $scope.copies = data._embedded.copies;

              angular.forEach($scope.copies, function(copy) {
                copy.available = function() {
                  return this.status === 'AVAILABLE';
                }.bind(copy);
              });
            } 
          });
     };

    $scope.listBooks();

    $scope.borrowCopy = function(copy) {
      var promise = modals.open(
        'prompt', { copy: copy }
      );

      promise.then(
        function handleResolve( response ) {
          console.log( '%s borrowed the copy %s', response.email, response.copy  );
        },
        function handleReject( error ) {
          console.warn( 'Prompt rejected!' );
        }
      );
    };

    $scope.returnCopy = function() {
      var promise = modals.open(
        'confirm', { message: 'Are you sure you want to taste that?!' }
      );

      promise.then(
        function handleResolve( response ) {
          console.log( 'Confirm resolved.' );
        },
        function handleReject( error ) {
          console.warn( 'Confirm rejected!' );
        }
      );
    };

    $scope.gotoAddBook = function () {
      window.location = '/#/add_book';
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
      addCopyRequest.donator = $scope.donator;

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
  }]
);