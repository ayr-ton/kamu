'use strict';

angular
  .module('libraryUiApp')
  .factory('authInterceptor', ['$rootScope', '$q', '$window', '$location', function ($rootScope, $q, $window, $location) {
    return {
      request: function (config) {
        if ($window.sessionStorage.token) {
          config.headers['x-token'] =  $window.sessionStorage.token;
        }
        return config;
      },
      responseError: function (response) {
        if(response.status === 403) {
            window.location.href = '/';
        }
        return $q.reject(response);
      }
    };
  }]);
