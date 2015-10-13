'use strict';

angular
  .module('libraryUiApp')
  .controller('BookDetailsController', ['$scope', '$routeParams', 'BookService', 'UserService','WaitingListService', function ($scope, $routeParams, BookService, UserService, WaitingListService) {
    $scope.currentBook = {};
    $scope.waitingLists = [];

    BookService.getCopy($routeParams.bookId).success(function (response) {
      $scope.currentBook = response;
      $scope.getCurrentWaitingList($routeParams.bookId);

      if ($scope.currentBook.hasOwnProperty('lastLoan') && $scope.currentBook.lastLoan !== null) {
          $scope.currentBook.lastLoan.user = {};
          $scope.currentBook.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail($scope.currentBook.lastLoan.email);
      }
    });


                $scope.getCurrentWaitingList = function (book_id) {console.log("entro")

                 var slug = $routeParams.library;

                    BookService.getLibraryBySlug(slug).
                      success(function (data) {
                        if (angular.isDefined(data._embedded)) {

                        WaitingListService.getWaitingList(book_id,data._embedded.libraries[0]._links.self.href.slice(-1)).
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
                                })
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
