'use strict';

/**
 * @ngdoc function
 * @name libraryUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the libraryUiApp
 */
angular.module('libraryUiApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
