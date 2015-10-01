
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

  describe('when returning a book', function () {
    var lastLoan, copy, loan;

    beforeEach(function () {
      lastLoan = { 'id': '1', email: '' };
      copy = { 'id': '21', 'imageUrl': 'path/to/image', 'lastLoan': lastLoan };
      loan = { 'id': '12', 'email': 'fakeuser@someemail.com', 'copy': copy };
    });

    it('successfully returns a book', inject(function ($window, Modal) {
      var modal = Modal;

      spyOn(modal, 'reject');
      spyOn(toastrLocal, 'success');
      compileElement(copy);

      httpBackend.expectPATCH(apiEndpoint.concat('/loans/12')).respond(200);
      httpBackend.expectGET(apiEndpoint.concat('/copies/').concat(copy.id).concat('?projection=copyWithBookInline')).respond(200, copy);

      scope.returnCopy(copy);

      modal.resolve({ 'loan': loan });

      httpBackend.flush();

      expect(scope.copy).toEqual(copy);
      expect(toastrLocal.success).toHaveBeenCalledWith('Book has returned to library.');
      expect(modal.reject).toHaveBeenCalled();
      expect(scope.copy.imageUrl).toEqual('path/to/image');
    }));

    describe('copy ret failure', function () {
      var codes =
        [{ 'responseCode': 428, 'errorCode': 'HTTP_CODE_428' },
        { 'responseCode': 500, 'errorCode': 'HTTP_CODE_500' }];

      codes.forEach(function (item) {
        it('shows an error', inject(function ($window, $translate, Modal) {
          spyOn(toastrLocal, 'error');
          spyOn($translate, 'instant');
          compileElement(copy);

          httpBackend.expectPATCH(apiEndpoint.concat('/loans/12')).respond(item.responseCode);

          scope.returnCopy(copy);

          Modal.resolve({ 'loan': loan });

          httpBackend.flush();

          expect(toastrLocal.error).toHaveBeenCalled();
          expect($translate.instant).toHaveBeenCalledWith(item.errorCode);
          expect(scope.loan).toEqual(lastLoan);
        }));
      });
    });
  });
});
