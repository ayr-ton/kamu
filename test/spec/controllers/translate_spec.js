'use strict';

describe('TranslateCtrl', function () {
  var $controller, scope, translate;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function(_$controller_, _$translate_, _$rootScope_) {
    translate = _$translate_;
    scope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('#changeLanguage', function () {
    it('changes language cookie', inject(function ($cookies) {
      var language = 'swahili';

      spyOn(translate, 'use');

      $controller('TranslateCtrl', { '$scope': scope, '$translate': translate });

      scope.changeLanguage(language);

      expect($cookies.get('language')).toBe(language);
      expect(translate.use).toHaveBeenCalledWith(language);
    }));
  });
});