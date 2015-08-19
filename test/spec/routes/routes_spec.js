describe('libraryUiApp routing', function() {
  it('should map BookCtrl routes to BookCtrl', function() {
    module('libraryUiApp');

    inject(function($route) {
      var rootUrl = $route.routes['/'];
      expect(rootUrl.controller).toBe('BookCtrl');
      expect(rootUrl.templateUrl).toEqual('views/book/index.html');

      var addBookUrl = $route.routes['/add_book'];
      expect(rootUrl.controller).toBe('BookCtrl');
      expect(rootUrl.templateUrl).toEqual('views/book/add-book.html');

  
      // expect($route.routes[null].redirectTo).toEqual('/phones')
    });
  });


}