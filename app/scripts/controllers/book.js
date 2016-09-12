'use strict';

angular
  .module('libraryUiApp')
  .controller('BookController', [
    '$scope',
    '$routeParams',
    'BookService',
    'UserService',
    'LoanService',
    function ($scope, $routeParams, BookService, UserService, LoanService) {
      $scope.library = $routeParams.library;

      function initializeCopy(copy) {
        if (copy.book.imageUrl === undefined || copy.book.imageUrl === null) {
          copy.book.imageUrl = 'images/no-image.png';
        }

        if (copy.lastLoan !== undefined && copy.lastLoan !== null) {
          copy.lastLoan.user = {};
          copy.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail(copy.lastLoan.email);
        }

        return copy;
      }


      $scope.listBooks = function () {

        $scope.copies = [];

        BookService.getCopiesByLibrarySlug($scope.library)
          .success(function (data) {
              var available;
              $scope.copies = data;
              var email = window.sessionStorage.email.toLowerCase();

              angular.forEach($scope.copies, function (copy) {
                  LoanService.hasUserBorrowedThisCopy($scope.library, copy.book.reference, email).success(function(pendingUserData){
                  available = BookService.getAvailableQuantityCopies($routeParams.library, copy.book.reference);

                  available.then(function(availableQuantity) {
                      available=availableQuantity.data;

                      if((available > 0) && (pendingUserData === 0)){
                         copy.status = 'AVAILABLE';
                      }
                      else if ((available === 0) || (pendingUserData > 0)){
                          copy.status = 'BORROWED';
                      }

                      copy = initializeCopy(copy);
                  });
                });

              });
          });
      };

      $scope.$on('$viewContentLoaded', function () {

        $scope.listBooks();
      });

    }]
);
