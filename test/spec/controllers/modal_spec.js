'use strict';

describe('ModalCtrl', function () {

  var controller, scope, Modal;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    Modal = {
      params: function () {
        return { copy: 'somecopy'};
      },

      reject: 'whatever'
    };

    scope = _$rootScope_;
    controller = _$controller_('BorrowModalCtrl', {'$scope': scope, 'Modal': Modal});
  }));

  describe('initialization', function () {
    it('initizes scope correctly', function () {
      expect(scope.copy).toBe('somecopy');
      expect(scope.cancel).toBe('whatever');
    });
  });
});