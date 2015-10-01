
describe('Book Action Buttons Directive', function () {
  var scope, compile, actionButtons;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($compile, $rootScope, $templateCache) {
    $templateCache.put('templates/book-action-buttons.html', window.__html__['app/templates/book-action-buttons.html']);

    scope = $rootScope.$new();
    compile = $compile;
  }));

  function compileElement(copy) {
    scope.copy = copy;
    var element = angular.element('<book-action-buttons copy="copy" ></book-action-buttons>');
    var compiled = compile(element)(scope);
    scope.$digest();
    return compiled;
  }

  describe('when copy is available', function () {
    var copy;

    beforeEach(function () {
      copy = { status: 'AVAILABLE' };
      window.sessionStorage['email'] = 'john.doe@thoughtworks.com';
    });

    it('has a borrow button', function () {
      actionButtons = compileElement(copy);

      expect(actionButtons.find('.books-shelf-borrow').length).toBe(1);
    });

    it('does not have a return button', function () {
      actionButtons = compileElement(copy);

      expect(actionButtons.find('.books-shelf-return').length).toBe(0);
    });
  });

  describe('when copy is not available', function () {
    var copy;

    beforeEach(function () {
      copy = { status: 'NOT_AVAILABLE' };
      window.sessionStorage['email'] = 'john.doe@thoughtworks.com';
    });

    it('does not have a borrow button', function () {
      actionButtons = compileElement(copy);

      expect(actionButtons.find('.books-shelf-borrow').length).toBe(0);
    });

    it('does not have any buttons (when the borrower is different than the current user)', function () {
      copy.lastLoan = { email: 'not.john.doe@thoughtworks.com' };
      actionButtons = compileElement(copy);

      expect(actionButtons.find('.books-shelf-borrow').length).toBe(0, 'borrow');
      expect(actionButtons.find('.books-shelf-return').length).toBe(0, 'return');
    });

    it('does have a return button (when the borrower is the same as the current user)', function () {
      copy.lastLoan = { email: 'john.doe@thoughtworks.com' };
      actionButtons = compileElement(copy);

      expect(actionButtons.find('.books-shelf-return').length).toBe(1);
    });
  });
});
