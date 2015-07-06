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
	.controller('MainCtrl', ['$scope', '$http', function($scope, $http){


  		var endPoint = 'https://tw-library-api.herokuapp.com/books';

		function findBooks() {
		        
		        //get all tasks and display initially
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
 
}]);