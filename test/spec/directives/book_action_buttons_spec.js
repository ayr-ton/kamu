
describe('Book Action Buttons Directive', function () {
  var scope, compile, actionButtons, loanService, toastrLocal, httpBackend, apiEndpoint;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($compile, $rootScope, $templateCache, $httpBackend, LoanService, toastr, ENV) {
    loanService = LoanService;
    toastrLocal = toastr;
    httpBackend = $httpBackend;
    apiEndpoint = ENV.apiEndpoint;

    $templateCache.put('templates/book-action-buttons.html', window.__html__['app/templates/book-action-buttons.html']);

    scope = $rootScope.$new();
    compile = $compile;
  }));

  function compileElement(copy) {
    scope.copy = copy;
    var element = angular.element('<book-action-buttons copy="copy" ></book-action-buttons>');
    var compiled = compile(element)(scope);
    scope.$digest();
    scope = element.isolateScope() || element.scope();
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

  describe('when borrowing a book', function() {
    var currentUser, copy, user, loan, copyAfterBorrow;

    beforeEach(function () {
      currentUser = 'fakeuser@someemail.com';
      copy = { 'id': '21', 'imageUrl': 'path/to/image' };
      user = { 'imageUrl' : 'http://www.gravatar.com/avatar/1dbd3e934b5d9a64f15826f7e9e23e16' };
      loan = {'id': '12', 'email': currentUser, 'copy': copy, 'user': user };
      copyAfterBorrow = { 'id': '21', 'imageUrl': 'path/to/image', 'lastLoan': loan};
    });

    it('successfully borrows a book', inject(function ($window) {
      $window.sessionStorage.email = currentUser;
      compileElement(copy);

      spyOn(loanService, 'borrowCopy').andCallThrough();
      spyOn(toastrLocal, 'success');

      httpBackend.expectPOST(apiEndpoint.concat('/loans')).respond(200);
      httpBackend.expectGET(apiEndpoint
        .concat('/copies/')
        .concat(copy.id).concat('?projection=copyWithBookInline')).respond(200, copyAfterBorrow);

      scope.borrowCopy(copy);

      httpBackend.flush();

      expect(loanService.borrowCopy).toHaveBeenCalledWith('21', 'fakeuser@someemail.com');
      expect(scope.copy).toEqual(copyAfterBorrow);
      expect(toastrLocal.success).toHaveBeenCalled();
    }));

    describe('copy borrow failure', function () {
      var codes =
        [{ 'responseCode': 412, 'errorCode': 'HTTP_CODE_412' },
        { 'responseCode': 409, 'errorCode': 'HTTP_CODE_409' },
        { 'responseCode': 500, 'errorCode': 'HTTP_CODE_500' }];

      codes.forEach(function(item) {
        it('shows error message', inject(function  ($window, $translate) {
          spyOn(toastrLocal, 'error');
          spyOn($translate, 'instant');
          compileElement(copy);

          httpBackend.expectPOST(apiEndpoint.concat('/loans')).respond(item.responseCode);

          scope.borrowCopy(copy);

          httpBackend.flush();

          expect(toastrLocal.error).toHaveBeenCalled();
          expect($translate.instant).toHaveBeenCalledWith(item.errorCode);
        }));
      });
    });
  });
});
