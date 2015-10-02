'use strict';

describe('LibraryController', function () {
  beforeEach(module('libraryUiApp'));

  var $controller, librariesUrl;

  beforeEach(inject(function (_$controller_, ENV) {
    $controller = _$controller_;
    librariesUrl = ENV.apiEndpoint + '/libraries';
  }));

  describe('$scope.libraries', function () {
    it('initializes libraries to an empty list', function () {
      var $scope = {};
      $scope.listLibraries = function () {
      };

      $controller('LibraryController', {$scope: $scope});

      expect($scope.libraries).toEqual({});
    });

    it('sets libraries to list of libraries when data is returned', inject(function ($injector) {
      var $scope = {};

      var httpBackend = $injector.get('$httpBackend');
      httpBackend.whenGET(librariesUrl).respond(200, {'_embedded': {libraries: 'library'}});

      $controller('LibraryController', {$scope: $scope});

      httpBackend.flush();

      expect($scope.libraries).toEqual('library');
    }));

    it('sets libraries to empty list when no data is returned', inject(function ($injector) {
      var $scope = {};

      var httpBackend = $injector.get('$httpBackend');
      httpBackend.whenGET(librariesUrl).respond(200, {});

      $controller('LibraryController', {$scope: $scope});

      httpBackend.flush();

      expect($scope.libraries).toEqual({});
    }));
  });

  describe('gravatar', function () {
    it('should returns user gravatar url', inject(function ($injector) {
      var $scope = {};
      var $window = $injector.get('$window');
      $window.sessionStorage.email = 'alisboa@thoughtworks.com';

      $controller('LibraryController', {$scope: $scope});
      expect($scope.getGravatarFromSession()).toEqual('http://www.gravatar.com/avatar/7aff7feba043b2651b7b0c099552c835');
    }));
  });
});
