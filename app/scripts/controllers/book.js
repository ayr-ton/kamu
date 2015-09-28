'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', ['$scope',
    'BookService',
    'LoanService',
    'NavigationService',
    'Modal',
    '$translate',
    '$route',
    '$routeParams',
    'UserService',
    'toastr',
    function ($scope, BookService, LoanService, NavigationService, Modal, $translate, $route, $routeParams, UserService, toastr) {

      $scope.searchCriteria = '';
      $scope.addingBook = false;
      $scope.isGoogleBook = false;
      $scope.currentBook = BookService.currentBook;

      var isInBookDetails = NavigationService.isBookDetails();

      $scope.currentUserEmail = window.sessionStorage.email;

      $scope.borrowerIsCurrentUser = function (copy) {

        if (copy.lastLoan !== undefined && copy.lastLoan !== null) {
          return copy.lastLoan.email.toLowerCase() === $scope.currentUserEmail.toLowerCase();
        }else {
          return false;
        }

      };

      $scope.goBack = function () {
        NavigationService.goBack();
      };

      $scope.isSettingsActive = function () {
        return NavigationService.isSettingsActive();
      };

      $scope.isAddBookActive = function () {
        return NavigationService.isAddBookActive();
      };

      $scope.isAddWishActive = function () {
        return NavigationService.isAddWishActive();
      };

      $scope.isAllBooksActive = function () {
        return NavigationService.isAllBooksActive();
      };

      $scope.isWishlistActive = function () {
        return NavigationService.isWishlistActive();
      };

      $scope.isBorrowedBooksActive = function () {
        return NavigationService.isBorrowedBooksActive();
      };

      $scope.autoCompleteSearch = function () {
        $scope.formShowable = false;
        $scope.errorShowable = false;
        $scope.searchShowable = true;
        $scope.isbnSearch = true;
      };
      $scope.autoCompleteSearch();

      $scope.getCurrentLibraryPath = function () {
        return $scope.isInsideLibrary() ? '#/library/' + getLibrarySlug() : '#/libraries';
      };

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

      $scope.isInsideLibrary = function () {
        return angular.isDefined($route.current) ? angular.isDefined(getLibrarySlug()) : false;
      };

      $scope.addManually = function () {
        $scope.book = {};
        $scope.searchShowable = false;
        $scope.isbnSearch = false;
        $scope.isGoogleBook = false;

        toggleFormDisplay(true);
      };

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

      $scope.listBooks = function () {

        $scope.copies = [];

        BookService.getLibraryBySlug(getLibrarySlug()).
          success(function (data) {
            if (angular.isDefined(data._embedded) && data._embedded.libraries[0]._embedded) {
              $scope.copies = data._embedded.libraries[0]._embedded.copies;

              angular.forEach($scope.copies, function (copy) {
                copy = initializeCopy(copy);
              });
            }
          });
      };

      function initializeCopy(copy) {
        if (copy.imageUrl === undefined || copy.imageUrl === null) {
          copy.imageUrl = 'images/no-image.png';
        }

        if (copy.lastLoan !== undefined && copy.lastLoan !== null) {
          copy.lastLoan.user = {};
          copy.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail(copy.lastLoan.email);
        }

        return copy;
      }

      $scope.$on('$viewContentLoaded', function () {
        $scope.listBooks();
      });

      $scope.loadBookDetails = function (copy) {
        BookService.getCopy(copy.id).success(function (response) {

          BookService.currentBook = response;
          $scope.currentBook = BookService.currentBook;
          
          var url = '#/library/' + getLibrarySlug() + '/book_details/' + copy.id;
          window.location.assign(url);

        });
      };

      $scope.reloadBookDetails = function (copyReference) {
        BookService.getCopy(copyReference).success(function (response) {
          BookService.currentBook = response;
          $scope.currentBook = BookService.currentBook;

        if (BookService.currentBook.lastLoan  !== undefined ) {
              $scope.currentBook.lastLoan.user = {};
              $scope.currentBook.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail(BookService.currentBook.lastLoan.email);
          }
          
        });
      };

      $scope.borrowCopy = function (copy) {
        var currentUser = window.sessionStorage.email;

        LoanService.
          borrowCopy(copy.id, currentUser).
          success(function () {
            BookService.getCopy(copy.id)
              .success(function (data) {
                var scope = angular.element('#copy-'.concat(copy.id)).scope();
                scope.copy = data;
                scope.copy.imageUrl = BookService.resolveBookImage(scope.copy.imageUrl);

                scope.copy.lastLoan.user = {
                  imageUrl: UserService.getGravatarFromUserEmail(scope.copy.lastLoan.email)
                };
              });
              toastr.success('Book has been loaned to '.concat(currentUser).concat('.'));
          }).
          error(function (data, status) {
            var errorMessage;

            switch (status) {
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
            toastr.error(errorMessage);
          });
      };

      $scope.returnCopy = function (copy) {
        var scope = angular.element('#modal-div').scope();
        scope.loan = copy.lastLoan;

        var promise = Modal.open(
          'not-available', {loan : copy.lastLoan}
        );

        promise.then(
          function handleResolve(response) {
            LoanService.
              returnCopy(response.loan.id).
              success(function () {
                Modal.reject();

                toastr.success('Book has returned to library.');

                BookService.getCopy(copy.id)
                  .success(function (data) {
                    var scope = angular.element('#copy-'.concat(copy.id)).scope();
                    scope.copy = data;
                    scope.copy.imageUrl = BookService.resolveBookImage(scope.copy.imageUrl);

                  });
              }).
              error(function (data, status) {
                var errorMessage;

                switch (status) {
                  case 428:
                    errorMessage = $translate.instant('HTTP_CODE_428');
                    break;
                  default:
                    errorMessage = $translate.instant('HTTP_CODE_500');
                    break;
                }

                toastr.error(errorMessage);
              });
          }
        );
      };

      $scope.gotoAllBooks = function () {
        window.location.assign('/#/library/' + getLibrarySlug());
      };

      $scope.gotoAddBook = function () {
        window.location.assign('/#/library/' + getLibrarySlug() + '/add_book');
      };

      $scope.gotoAddWish = function () {
        window.location.assign('/#/library/' + getLibrarySlug() + '/add_wish');
      };

      $scope.gotoSettings = function () {
        window.location.assign('/#/library/' + getLibrarySlug() + '/settings');
      };

      var populateBookFromLibraryApi = function (data) {
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
      };

      var populateBookFromGoogleApi = function (data) {
        angular.forEach(data.items, function (item) {
          $scope.book = BookService.extractBookInformation(item.volumeInfo, $scope.searchCriteria);
          $scope.isGoogleBook = true;
        });

        var formDisplay = $scope.book.title !== undefined;
        toggleFormDisplay(formDisplay);

        if(!formDisplay) {
          $scope.addManually();
          $scope.errorShowable = !formDisplay;
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
        addCopyRequest.donator = $scope.donator;

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

      function toggleFormDisplay(displayable) {
        $scope.formShowable = displayable;
        $scope.errorShowable = !displayable;
      }

      if (isInBookDetails) {
        $scope.reloadBookDetails($routeParams.bookId);
      }
    }]
);
