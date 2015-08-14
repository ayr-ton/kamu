'use strict';

/**
 * @ngdoc function
 * @name libraryUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the libraryUiApp
 */
 angular
  .module('libraryUiApp')
  .controller('MainCtrl', ['$scope', '$http', 'ENV', 'modals' , function($scope, $http, ENV, modals){


  var endPoint = ENV.apiEndpoint + '/books';

  function findBooks() {
    $http.get(endPoint).
      success(function (data) {
        if (data._embedded !== undefined) {
          angular.forEach(data._embedded, function (item) {
            $scope.books = item;
          });
        } else {
          $scope.books = [];
        }
      });
  }

  findBooks();

  $scope.borrowCopy = function(copy) {
    var promise = modals.open(
      'prompt', { copy: copy }
    );

    promise.then(
      function handleResolve( response ) {
        console.log( "%s borrowed the copy %s", response.email, response.copy  );
      },
      function handleReject( error ) {
        console.warn( 'Prompt rejected!' );
      }
    );
  };

  $scope.returnCopy = function() {
    var promise = modals.open(
      'confirm', { message: 'Are you sure you want to taste that?!' }
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
    window.location = '/#/add_book';
  }
}]);