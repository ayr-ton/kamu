'use strict'

describe('Modals', function () {

  beforeEach(module('libraryUiApp'));

  describe('#open', function () {
    it('emits modal.open message', inject(function ($rootScope, $q, modals) {
      spyOn($rootScope, '$emit');

      var promise = modals.open(window, {}, false);

      expect($rootScope.$emit).toHaveBeenCalledWith('modals.open', window);
      expect(promise).toEqual($q.defer().promise);
    }));
  });

  describe('#params', function() {
    it('returns params when set', inject(function ($rootScope, $q, modals) {
      var params = { "param": "someValue" };

      var promise = modals.open(window, params, false);

      expect(modals.params()).toEqual(params);
    }));

    it('returns empty hash when not set', inject(function ($rootScope, $q, modals) {
      expect(modals.params()).toEqual({});
    }));
  });
});