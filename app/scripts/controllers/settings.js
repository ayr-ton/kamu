'use strict';

angular
  .module('libraryUiApp')
  .controller('SettingsController', [
    '$scope',
    '$translate',
    function ($scope, $translate) {

      var $cookies;
      $scope.languages = [
        {name : 'Español Ecuador', code : 'es-EC'},
        {name : 'Português Brasil', code : 'pt-BR'},
        {name : 'English USA', code : 'en-US'}
      ];

      $scope.selectedIndex = 2;
      angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
        $cookies = _$cookies_;
      }]);
      var selectedCode = $cookies.get('language');

      for (var index = 0; index < $scope.languages.length; index++) {

        if ($scope.languages[index].code.toLowerCase() === selectedCode.toLowerCase()) {
          $scope.selectedIndex = index;
          break;
        }
      }

      $scope.changeLanguage = function ($index) {
        $scope.selectedIndex = $index;

        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 365);

        var language = $scope.languages[$index].code;
        $cookies.put('language', language, {'expires' : expireDate});
        $translate.use(language);
      };
    }]);
