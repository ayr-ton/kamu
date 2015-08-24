'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', [ '$scope',
                            'BookService', 
                            'LoanService', 
                            'modals', 
                            '$translate',
                            '$route',
                            '$http',
                            function($scope, BookService, LoanService, modals, $translate, $route, $http) {

    $scope.searchCriteria = '';

    $scope.autoCompleteSearch = function() {
        $scope.formShowable  = false;
        $scope.errorShowable = false;
        $scope.searchShowable = true;
        $scope.isbnSearch = true;
      };
    $scope.autoCompleteSearch();

    $scope.findGoogleBooks = function() {
        var searchCriteria = $scope.searchCriteria.toString();

        $scope.book = { };

        if (searchCriteria !== '') {
          BookService.findLibraryBook(searchCriteria).
            success(populateBookFromLibraryApi).
            error(function() {
                toggleFormDisplay(false);
              });
        }   
      };

    $scope.isInsideLibrary = function() {
      return angular.isDefined($route.current) ? angular.isDefined(getLibrarySlug()) : false;
    };

    $scope.addManually = function() {
        $scope.book = {};
        $scope.searchShowable = false;
        $scope.isbnSearch = false;

        toggleFormDisplay(true);
      };

    $scope.addBookToLibrary = function() {
      var librarySlug = getLibrarySlug();

      BookService.getLibraryBySlug(librarySlug).
        success(function(data){
          if (angular.isDefined(data._embedded)) {
            var library = data._embedded.libraries[0]._links.self.href;

            if (!$scope.bookExistsInTheLibrary) {
              addBook(library);
            } else {
              var book = $scope.book._links.self.href;
              addCopy(library, book);
            }
          } else {
            window.alert($translate.instant('INVALID_LIBRARY_ERROR'));
          }
        });
      };

    $scope.listBooks = function() {
        $scope.copies = [];

        BookService.getLibraryBySlug(getLibrarySlug()).
          success(function(data) {
            if (angular.isDefined(data._embedded) && data._embedded.libraries[0]._embedded) {
              $scope.copies = data._embedded.libraries[0]._embedded.copies;

              angular.forEach($scope.copies, function(copy) {
                copy = initializeCopy(copy);
              });
            }
          });
     };

    function initializeCopy(copy) {
      if ( copy.imageUrl === undefined || copy.imageUrl === null ) {
        copy.imageUrl = 'images/no-image.png';
      }

      return copy;
    }

    $scope.$on('$viewContentLoaded', function(){
        $scope.listBooks();
      });

    $scope.borrowCopy = function(copy) {
      
      var promise = modals.open(
        'available', { copy: copy }
      );

      promise.then(
        function handleResolve( response ) {

          console.log( '%s borrowed the copy %s', response.email, response.copy.id  );
          LoanService.
                  borrowCopy(response.copy.id , response.email).
                  success(function() {
                      modals.reject;

                      window.alert('Book has loaned to '.concat(response.email).concat('.'));
                      BookService.getCopy(copy.id)
                        .success(function(data) {

                            var scope = angular.element('#copy-'.concat(copy.id)).scope();

                            scope.copy = data;

                            scope.copy.imageUrl = scope.copy.imageUrl || 'images/no-image.png';
                        
                        });
                  }).
                  error(function(data, status){

                      var errorMessage;

                      switch(status) {
                          case 412:
                              errorMessage = $translate.instant('HTTP_CODE_412');
                              break;
                          case 409:
                              errorMessage = $translate.instant('HTTP_CODE_409');
                              break;
                          default:
                              errorMessage = $translate.instant('HTTP_CODE_500');
                              break;
                      }                      

                      window.alert("Ops! Loan wasn't realize. Cause: ".concat(errorMessage));
                  });
        },
        function handleReject( error ) {

            console.warn( 'Available rejected!' );
        }
      );
    };

    $scope.returnCopy = function(loan) {

      var promise = modals.open(
        'not-available', { loan: loan }
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
      window.location = '/#/library/' + getLibrarySlug() + '/add_book';
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

    function getLibrarySlug() {
      return $route.current.pathParams.library;
    }

    function addCopy(library, book) {
      var addCopyRequest = {};
      addCopyRequest.status = 'AVAILABLE';
      addCopyRequest.library = library;
      addCopyRequest.book = book;
      addCopyRequest.donator = $scope.donator;

      BookService.addCopy(addCopyRequest).
        success(function() {
          window.alert('Book has been added to library successfully.');
          window.location = '/#/library/' + getLibrarySlug();
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