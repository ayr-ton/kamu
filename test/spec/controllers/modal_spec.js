'use strict';

describe('ModalCtrl', function () {

  var controller, scope, modals;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    modals = {
      params: function () {
        return { copy: 'somecopy'};
      },

      reject: 'whatever'
    };

    scope = _$rootScope_;
    controller = _$controller_('BorrowModalCtrl', {'$scope': scope, 'modals': modals});
  }));

  describe('initialization', function () {
    it('initizes scope correctly', function () {
      expect(scope.copy).toBe('somecopy');
      expect(scope.cancel).toBe('whatever');
    });
  });
});