'use strict';

angular
  .module('libraryUiApp')
  .controller('TranslateController', ['$translate', '$scope', function ($translate, $scope) {

    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
      $cookies = _$cookies_;
    }]);

    $scope.changeLanguage = function (language) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 365);

      $cookies.put('language', language, {'expires': expireDate});

      $translate.use(language);
    };
  }]);
