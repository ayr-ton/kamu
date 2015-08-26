'use strict';

angular
  .module('libraryUiApp')
  .controller('TranslateCtrl', ['$translate', '$scope', '$cookies', function ($translate, $scope, $cookies) {
    $scope.changeLanguage = function (language) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 365);

      $cookies.put('language', language, {'expires': expireDate});

      $translate.use(language);
    };
  }]);
