'use strict';



describe('when enable a security access between API and UI', function() {

// arrumar uma forma de mocar o token
//receber o $http (contexto angular) injetado
//testar se o objeto tem o parametro XXXX setado no header
//done!

  var http, httpBackend, apiEndpoint, route, location, scope, factory;

  beforeEach(module('libraryUiApp'));

  beforeEach(function () {
    inject(function ($http, _$httpBackend_, $route, $location, ENV, $rootScope, $injector) {
      http = $http;
      httpBackend = _$httpBackend_;
      apiEndpoint = ENV.apiEndpoint;
      route = $route;
      location = $location;
      scope = $rootScope;
      factory = $injector.get('authInterceptor');
    })
  });

  it('when token is generated', function() {
    window.sessionStorage.token = 'TOKENFAKE';
    var config = { headers: {}};
    factory.request(config);
    expect(config.headers['x-token']).toBe('TOKENFAKE');
  });

  it('when http header has an invalid token', function() {

    var librariesExpectedGet = apiEndpoint.concat('/libraries');

    httpBackend
            .expectGET(librariesExpectedGet)
            .respond(403);

    httpBackend
            .expectGET('views/library/index.html')
            .respond(200);

    spyOn(window.location, 'replace');

    http.get(librariesExpectedGet);

    scope.$digest();
    httpBackend.flush();

    expect(window.location.replace).toHaveBeenCalledWith('/');
  });


});
