'use strict';

angular
  .module('libraryUiApp')
  .controller('BookDetailsController', ['$scope', '$routeParams', 'BookService', 'UserService', function ($scope, $routeParams, BookService, UserService) {
    $scope.currentBook;

    BookService.getCopy($routeParams.bookId).success(function (response) {
      $scope.currentBook = response;

      if ($scope.currentBook.hasOwnProperty('lastLoan') && $scope.currentBook.lastLoan != null) {
          $scope.currentBook.lastLoan.user = {};
          $scope.currentBook.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail($scope.currentBook.lastLoan.email);
      }
    });
  }]);
