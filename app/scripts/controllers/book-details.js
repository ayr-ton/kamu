'use strict';

angular
  .module('libraryUiApp')
  .controller('BookDetailsController', ['$scope', '$route', 'BookService', function ($scope, $route, BookService) {
    $scope.currentBook;

    $scope.loadBookDetails = function (copy) {
      BookService.getCopy(copy.id).success(function (response) {

        $scope.currentBook = response

        var url = '#/library/' + getLibrarySlug() + '/book_details/' + copy.id;
        window.location.assign(url);

      });
    };

    $scope.reloadBookDetails = function (copyReference) {
      BookService.getCopy(copyReference).success(function (response) {
        $scope.currentBook = response;

        if ($scope.currentBook.lastLoan  !== undefined ) {
            $scope.currentBook.lastLoan.user = {};
            $scope.currentBook.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail($scope.currentBook.lastLoan.email);
        }
      });
    };

    function getLibrarySlug() {
      return $route.current.pathParams.library;
    }

  }]);
