describe('Navigation Controller', function () {
  var controller, scope, location, rootScope, httpBackend, env;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $location, $route, $httpBackend, ENV) {
    rootScope = $rootScope;
    route = $route;
    scope = $rootScope.$new();
    location = $location;
    controller = $controller('NavigationController', { '$scope': scope });
    httpBackend = $httpBackend;
    env = ENV;
  }));

  it('has a library slug set to empty on the scope', function () {
    expect(scope.library).toBe('');
  });

  it('has loaded a library', function () {
    scope.library = 'test_library';
    expect(scope.hasLoadedLibrary()).toBe(true);
  });

  it('has not loaded a library', function () {
    scope.library = '';
    expect(scope.hasLoadedLibrary()).toBe(false);
  });

  it('has a navigation item active', function () {
    location.path('/library/test_library/add_book');

    expect(scope.isActive('add_book')).toBe(true);
  });

  it('has all books navigation active', function () {
  location.path('/library/test_library');

    expect(scope.isActive('/')).toBe(true);
  });

  it('has all books navigation active (when path ends with as foward slash)', function () {
    location.path('/library/test_library/');

    expect(scope.isActive('/')).toBe(true);
  });

  it('has not a navigation item active', function () {
    location.path('/library/test_library/add_book');

    expect(scope.isActive('settings')).toBe(false);
  });

  describe('when route changes', function () {
    it('unset the library slug', function () {
      httpBackend.expectGET('views/library/index.html').respond(200);

      location.path('/');
      rootScope.$digest();

      rootScope.$broadcast('$routeChangeSuccess', route.current);

      expect(scope.library).toBe('');
    });

    it('set the library slug', function () {
      httpBackend.expectGET('views/book/index.html').respond(200);
      httpBackend.when('GET', env.apiEndpoint + '/libraries/search/findBySlug?slug=test_library').respond(200, {});

      location.path('/library/test_library');
      rootScope.$digest();

      rootScope.$broadcast('$routeChangeSuccess', route.current);

      expect(scope.library).toBe('test_library');
    });
  });
});
