'use strict';

angular
  .module('libraryUiApp')
  .directive(
      "bnModals",
      function( $rootScope, modals ) {

        // Return the directive configuration.
        return( link );


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

          // I define which modal window is being rendered. By convention,
          // the subview will be the same as the type emitted by the modals
          // service object.
          scope.subview = null;

          // If the user clicks directly on the backdrop (ie, the modals
          // container), consider that an escape out of the modal, and reject
          // it implicitly.
          element.on(
            "click",
            function handleClickEvent( event ) {

              if ( element[ 0 ] !== event.target ) {

                return;

              }

              scope.$apply( modals.reject );

            }
          );

          // Listen for "open" events emitted by the modals service object.
          $rootScope.$on(
            "modals.open",
            function handleModalOpenEvent( event, modalType ) {

              scope.subview = modalType;

            }
          );

          // Listen for "close" events emitted by the modals service object.
          $rootScope.$on(
            "modals.close",
            function handleModalCloseEvent( event ) {

              scope.subview = null;

            }
          );

        }

      }
    );