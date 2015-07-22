'use strict';

/**
 * @ngdoc overview
 * @name libraryUiApp
 * @description
 * # libraryUiApp
 *
 * Main module of the application.
 */
angular
  .module('libraryUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'md.data.table',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

	$mdThemingProvider
		.theme('default')
        .primaryPalette('blue')
	    .accentPalette('blue');
  });
