'use strict';

angular
  .module('libraryUiApp')
  .controller('BookController', [
    '$scope',
    '$routeParams',
    'BookService',
    'UserService',
    'WaitingListService',
    function ($scope, $routeParams, BookService, UserService, WaitingListService) {
      $scope.library = $routeParams.library;

      $scope.listBooks = function () {
        $scope.copies = [];

        BookService.getCopiesByLibrarySlug($scope.library)
          .success(function (data) {
            if (angular.isDefined(data._embedded) && data._embedded.copies) {
              $scope.copies = data._embedded.copies;

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

    }]
);
