'use strict';

/**
 * @ngdoc function
 * @name libraryUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the libraryUiApp
 */
angular.module('libraryUiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
