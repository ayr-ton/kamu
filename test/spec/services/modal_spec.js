'use strict'

describe('Modals', function () {

  beforeEach(module('libraryUiApp'));

  describe('Open', function () {
    it('emits modal.open message', inject(function ($rootScope, $q, modals) {
      spyOn($rootScope, '$emit');

      var promise = modals.open(window, {}, false);
      promise = modals.open(window, {}, false);

      expect($rootScope.$emit).toHaveBeenCalledWith('modals.open', window);
      expect(promise).toEqual($q.defer().promise);
    }));
  });
});