'use strict';

describe('Modal Controllers', function () {

  var controller, scope, modal;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_, Modal) {
    controller = _$controller_;
    scope = _$rootScope_;
    modal = Modal;
  }));


  describe('ModalCtrl', function () {
    describe('#cancel', function() {
      it('rejects modal', function () {
        controller('ModalCtrl', {'$scope': scope, 'Modal': modal});

        spyOn(modal, 'reject');

        scope.cancel();

        expect(modal.reject).toHaveBeenCalled();
      });
    });
  });  

  describe('BorrowModalCtrl', function () {
    it('initizes scope correctly', function () {
      controller('BorrowModalCtrl', {'$scope': scope, 'Modal': modal});

      expect(scope.copy).toBe(modal.params().copy);
    });

    describe('#submit', function() {
      it('resolves modal with loan', function () {
        controller('BorrowModalCtrl', {'$scope': scope, 'Modal': modal});

        scope.copy = '/path/to/copy/3';
        scope.form = { 'user': 'fakeuser' };

        spyOn(modal, 'resolve');

        scope.submit();

        expect(modal.resolve).toHaveBeenCalledWith({copy: '/path/to/copy/3', email: 'fakeuser@thoughtworks.com' });
      });
    });
  });

  describe('ReturnModalCtrl', function () {
    it('initizes scope correctly', function () {
      controller('ReturnModalCtrl', {'$scope': scope, 'Modal': modal});

      expect(scope.loan).toBe(modal.params().loan);
    });

    describe('#submit', function() {
      it('resolves modal with loan', function () {
        controller('ReturnModalCtrl', {'$scope': scope, 'Modal': modal});

        scope.loan = { 'id' : '34' };

        spyOn(modal, 'resolve');

        scope.submit();

        expect(modal.resolve).toHaveBeenCalledWith({ 'loan' : { 'id' : '34' }});
      });
    });
  });
});