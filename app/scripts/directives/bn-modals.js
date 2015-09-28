'use strict';

angular
  .module('libraryUiApp')
  .directive('bnModals', ['$rootScope', 'Modal', function($rootScope, Modal) {
    function link(scope, element) {
      scope.subview = null;

      element.on('click', function handleClickEvent(event) {
          if (element[ 0 ] !== event.target) {
            return;
          }

          scope.$apply(Modal.reject);
        });

      $rootScope.$on('Modal.open', function handleModalOpenEvent(event, modalType) {
          scope.subview = modalType;
        });

      $rootScope.$on('Modal.close', function handleModalCloseEvent() {
          scope.subview = null;
        });
    }

    return link;
  }]
);
