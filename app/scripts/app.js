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
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ngCookies'
  ])
  .config(function ($routeProvider, $translateProvider) {
    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
      $cookies = _$cookies_;
    }]);

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

    $translateProvider
      .translations('en-US', {
        APP_LIBRARY_TAB: 'Library',
        APP_WISHLIST_TAB: 'WISH LIST',
      })
      .translations('pt-BR', {
        APP_LIBRARY_TAB: 'Biblioteca',
        APP_WISHLIST_TAB: 'Lista de Desejos',
      })
      .translations('es-EC', {
        APP_LIBRARY_TAB: 'Libreria',
        APP_WISHLIST_TAB: 'Lista',
      });

    $translateProvider.determinePreferredLanguage(function(){
      var language = $cookies.get('language');

      if (language == null) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 365);

        $cookies.put('language', navigator.language || navigator.userLanguage, { 'expires' : expireDate });
      }

      return language;
    });

    $translateProvider.useSanitizeValueStrategy('sanitize');
  });