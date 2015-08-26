'use strict';

describe('LibraryCtrl', function () {
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

      $controller('LibraryCtrl', {$scope: $scope});

      expect($scope.libraries).toEqual({});
    });

    it('sets libraries to list of libraries when data is returned', inject(function ($injector) {
      var $scope = {};

      var httpBackend = $injector.get('$httpBackend');
      httpBackend.whenGET(librariesUrl).respond(200, {'_embedded': {libraries: 'library'}});

      $controller('LibraryCtrl', {$scope: $scope});

      httpBackend.flush();

      expect($scope.libraries).toEqual('library');
    }));

    it('sets libraries to empty list when no data is returned', inject(function ($injector) {
      var $scope = {};

      var httpBackend = $injector.get('$httpBackend');
      httpBackend.whenGET(librariesUrl).respond(200, {});

      $controller('LibraryCtrl', {$scope: $scope});

      httpBackend.flush();

      expect($scope.libraries).toEqual({});
    }));
  });
});
