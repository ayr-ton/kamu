'use strict';

angular
  .module('libraryUiApp')
  .controller('SettingsCtrl', ['$scope',
    'NavigationService',
    '$translate',
    function ($scope, NavigationService, $translate) {

      var $cookies;
      $scope.languages = [
        {name : "Español Ecuador", code : "es-EC"},
        {name : "Portugués Brasil", code : "pt-BR"},
        {name : "English USA", code : "en-US"}
      ];

      $scope.goBack = function() {
        NavigationService.goBack();
      };

      $scope.selectedIndex = 0;
      angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
        $cookies = _$cookies_;
      }]);
      var selectedCode = $cookies.get('language');

      for (var index = 0; index < $scope.languages.length; index++) {
        if ($scope.languages[index].code == selectedCode) {
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
