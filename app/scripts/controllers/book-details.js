'use strict';

angular
.module('libraryUiApp')
.controller('BookDetailsController', ['$scope', '$routeParams', '$translate', 'BookService', 'UserService','WaitingListService', function ($scope, $routeParams, $translate, BookService, UserService, WaitingListService) {
  $scope.currentBook = {};
  $scope.waitingLists = [];
  $scope.currentBook.quantity=0;

  BookService.getCopy($routeParams.bookId).success(function (response) {
    $scope.currentBook = response;
    $scope.getCurrentWaitingList($routeParams.bookId);
    $scope.currentBook.quantity = BookService.getQuantityCopies($routeParams.library,$routeParams.bookId);
    $scope.currentBook.availableQuantity = BookService.getAvailableQuantityCopies($routeParams.library,$routeParams.bookId);
    $scope.currentBook.quantity.then(function(data) {
      console.log('Got data! Promise fulfilled quantity.');
      console.log(data.data);
      $scope.currentBook.quantity=data.data;
    
    }   , function(error) {
       console.log('Promise rejected.');
       console.log(error.message);
  }  );

    $scope.currentBook.availableQuantity.then(function(data) {
      console.log('Got data! Promise fulfilled. availableQuantity');
      console.log(data.data);
      $scope.currentBook.availableQuantity=data.data;
    
    }   , function(error) {
       console.log('Promise rejected.');
       console.log(error.message);
  }  );

    if ($scope.currentBook.hasOwnProperty('lastLoan') && $scope.currentBook.lastLoan !== null) {
      $scope.currentBook.lastLoan.user = {};
      $scope.currentBook.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail($scope.currentBook.lastLoan.email);
    }
  });




  function toggleFormDisplay(displayable) {
    $scope.formShowable = displayable;
    $scope.errorShowable = !displayable;
  }
  $scope.getCurrentWaitingList = function (bookId) {
    var slug = $routeParams.library;

    BookService.getLibraryBySlug(slug).
      success(function (data) {
      if (angular.isDefined(data._embedded)) {

        WaitingListService.getWaitingList(bookId,data._embedded.libraries[0]._links.self.href.slice(-1)).
          success(function (data) {

          if (angular.isDefined(data._embedded) && data._embedded.waitingLists[0]) {
            $scope.waitingLists = data._embedded.waitingLists;
            var cont = 0;

            angular.forEach($scope.waitingLists, function (waitingList) {
              cont++;
              waitingList.order = cont;

              WaitingListService.getDataFromURL(waitingList._links.user.href)
              .then(function(data){
                waitingList.userName = data.data.name;
                waitingList.userEmail = data.data.email;
                waitingList.userImageUrl = UserService.getGravatarFromUserEmail(data.data.email);
              });
            });
          }
        }).
          error(function () {
          toggleFormDisplay(false);
        });

      } else {
        window.alert($translate.instant('INVALID_LIBRARY_ERROR'));
      }
    });
  };

}]);
