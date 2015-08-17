'use strict';

angular
  .module('libraryUiApp')
  .directive('bnModals', function($rootScope, modals) {
    function link(scope, element, attributes) {
      scope.subview = null;

      element.on('click', function handleClickEvent(event) {
          if (element[ 0 ] !== event.target) {
            return;
          }

          scope.$apply(modals.reject);
        });

      $rootScope.$on('modals.open', function handleModalOpenEvent(event, modalType) {
          scope.subview = modalType;
        });

      $rootScope.$on('modals.close', function handleModalCloseEvent(event) {
          scope.subview = null;
        });
    }

    return(link);
  }
);