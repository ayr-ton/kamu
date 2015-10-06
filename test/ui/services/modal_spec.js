'use strict';

describe('Modal', function () {

  var modal, q, scope;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function (_$rootScope_, _$q_, Modal) {
    scope = _$rootScope_;
    q = _$q_;
    modal = Modal;
  }));

  describe('#open', function () {
    it('emits open message', function () {
      spyOn(scope, '$emit');

      var promise = modal.open(window, {}, false);

      expect(scope.$emit).toHaveBeenCalledWith('Modal.open', window);
      expect(promise).toEqual(q.defer().promise);
    });
  });

  describe('#params', function () {
    it('returns params when set', function () {
      var params = { 'param': 'someValue' };

      modal.open(window, params, false);

      expect(modal.params()).toEqual(params);
    });

    it('returns empty hash when not set', function () {
      expect(modal.params()).toEqual({});
    });
  });

  describe('#proceedTo', function () {
    it('returns a promise', function () {
      expect(modal.proceedTo(window, { 'param': 'someParam' })).toEqual(q.defer().promise);
    });
  });

  describe('#reject', function () {
    it('emits close message when deffered is set', function () {
      modal.open(window, {}, false);

      spyOn(scope, '$emit');

      modal.reject('wierdReason');

      expect(scope.$emit).toHaveBeenCalledWith('Modal.close');
    });

    it('does not emit message when deferred is not set', function (){
      spyOn(scope, '$emit');

      modal.reject('wierdReason');

      expect(scope.$emit).not.toHaveBeenCalledWith('Modal.close');
    });
  });

  describe('#resolve', function () {
    it('emits close message', function () {
      modal.open(window, {}, false);

      spyOn(scope, '$emit');

      modal.resolve('wierdReason');

      expect(scope.$emit).toHaveBeenCalledWith('Modal.close');
    });

    it('does not emit message when deferred is not set', function (){
      spyOn(scope, '$emit');

      modal.resolve('wierdReason');

      expect(scope.$emit).not.toHaveBeenCalledWith('Modal.close');
    });
  });
});