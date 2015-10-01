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
    function ($scope, BookService, LoanService, NavigationService, Modal, $translate, $route, $routeParams, UserService) {
      var isInBookDetails = NavigationService.isBookDetails();
      $scope.library = $routeParams.library;

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

      $scope.getCurrentLibraryPath = function () {
        return $scope.isInsideLibrary() ? '#/library/' + getLibrarySlug() : '#/libraries';
      };


      $scope.isInsideLibrary = function () {
        return angular.isDefined($route.current) ? angular.isDefined(getLibrarySlug()) : false;
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

      function getLibrarySlug() {
        return $route.current.pathParams.library;
      }

      if (isInBookDetails) {
        $scope.reloadBookDetails($routeParams.bookId);
      }
    }]
);
