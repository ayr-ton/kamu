'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', [
    '$scope',
    '$routeParams',
    'BookService',
    'UserService',
    function ($scope, $routeParams, BookService, UserService) {
      $scope.library = $routeParams.library;

      $scope.listBooks = function () {
        $scope.copies = [];

        BookService.getLibraryBySlug($scope.library)
          .success(function (data) {
            $scope.copies = data;
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
    }]
);
