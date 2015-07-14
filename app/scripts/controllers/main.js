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
	.controller('MainCtrl', ['$scope', '$http', 'ENV', function($scope, $http, ENV){


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

}]);
