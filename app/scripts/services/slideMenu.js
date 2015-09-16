///../css/library.css

/*****/
(function (modules) {
  /******/
  var installedModules = {};
  /******/
  function __webpack_require__(moduleId) {
    /******/
    if (installedModules[moduleId])
    /******/            {
      return installedModules[moduleId].exports;
    }
    /******/
    var module = installedModules[moduleId] = {
      /******/            exports : {},
      /******/            id      : moduleId,
      /******/            loaded  : false
      /******/
    };
    /******/
    if(modules[moduleId]) {
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    }
    /******/
    /******/
    module.loaded = true;
    /******/
    return module.exports;
    /******/
  }

  /******/
  __webpack_require__.m = modules;
  /******/
  __webpack_require__.c = installedModules;
  /******/
  __webpack_require__.p = "";
  /******/
  return __webpack_require__(0);
  /******/
})
  /******/([
  function (module, exports, __webpack_require__) {

    __webpack_require__(1);
    module.exports = __webpack_require__(2);
  },
  function (module, exports, __webpack_require__) {
    var slideMenu = angular.module('libraryUiApp');

    slideMenu.factory('asmService', ['$rootScope', function ($rootScope) {
      return {
        asmStates      : {
          'pushLeft' : {active : false, exclusive : true}
        },
        resizeViewport : function () {
          var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
          document.getElementsByClassName("viewport")[0].setAttribute("style", "height:" + y + "px; width:" + x + "px; overflow-y:auto");
          document.getElementsByClassName("mobile-nav")[0].setAttribute("style", "height:" + y + "px;");
        },
        asmPush        : null,
        toggle         : function (menuKey) {
          if (this.asmStates.hasOwnProperty(menuKey)) {
            var menuValue = this.asmStates[menuKey];
            var canToggle = true;
            var key = null;
            for (key in this.asmStates) {
              var value = this.asmStates[key];
              if ((key !== menuKey) && (value.active && (value.exclusive || menuValue.exclusive))) {
                canToggle = false;
                break;
              }
            }
            if (canToggle) {
              this.asmStates[menuKey].active = !this.asmStates[menuKey].active;
              this.asmPush = (menuKey.substring(0, 4) === 'push' && this.asmStates[menuKey].active)
                ? menuKey.substring(4).toLowerCase() : null;
              $rootScope.$emit('asmEvent', null);
            }
            else {
              console.log('Cannot toggle!');
            }
          }
          else {
            console.log('Unknown menu!');
          }
        }
      };
    }]);

    slideMenu.directive('resize', ['$window', 'asmService', function ($window, asmService) {
      return function (scope, element) {
        var w = angular.element($window);

        w.bind('resize', function () {
          asmService.resizeViewport();
          scope.$apply();
        });
      }
    }]);

    slideMenu.directive('asmContainerSlider', ['$rootScope', 'asmService', function ($rootScope, asmService) {
      return {
        restrict : 'AEC',
        link     : function (scope, element, attrs) {
          asmService.resizeViewport();

          $rootScope.$on('asmEvent', function () {
            var body = document.body;
            switch (asmService.asmPush) {
              case 'left':
                element.removeClass('containerSlider-closed');
                element.addClass('containerSlider-open');
                element.parent().addClass("noScroll");
                body.className = body.className + " noScroll";
                break;
              default:
                element.removeClass('containerSlider-open');
                element.addClass('containerSlider-closed');
                element.parent().removeClass("noScroll");
                body.className = "";
                break;
            }
          });
        }
      };
    }]);

    slideMenu.directive('asmControl', ['asmService', function (asmService) {
      return {
        restrict : 'AEC',
        compile  : function (element, attrs) {
          //element[0].innerHTML = '<a href="#">' + element[0].innerHTML + '</a>';
          return {
            pre  : function preLink(scope, iElement, iAttrs) {
            },
            post : function postLink(scope, iElement, iAttrs) {
              iElement.on('click', function (ev) {
                ev.preventDefault();
                asmService.toggle(iAttrs.asmControl);
              });
            }
          };
        }
      };
    }
    ]);
  }
]);
