'use strict';

/**
 * @ngdoc overview
 * @name libraryUiApp
 * @description
 * # libraryUiApp
 *
 * Main module of the application.
 */
angular
  .module('libraryUiApp', [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ngCookies',
    'ui.mask',
    'ngMd5',
    'ngAnimate',
    'toastr'
  ])
  .config(['$routeProvider', '$translateProvider', 'toastrConfig', function ($routeProvider, $translateProvider, toastrConfig) {
    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
      $cookies = _$cookies_;
    }]);

    angular.extend(toastrConfig, {
      positionClass: 'toast-top-center'
    });

    var rootUrl = '/library/:library';

    $translateProvider.useSanitizeValueStrategy('escape');
    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
      .when(rootUrl, {
        templateUrl: 'views/book/index.html',
        controller: 'BookCtrl'
      })
      .when(rootUrl + '/add_book', {
        templateUrl: 'views/book/add-book.html',
        controller: 'AddBookController'
      })
      .when('/libraries', {
        templateUrl: 'views/library/index.html',
        controller: 'LibraryCtrl'
      })
      .when('/', {
        templateUrl: 'views/library/index.html',
        controller: 'LibraryCtrl'
      })
      .when(rootUrl + '/book_details/:bookId', {
        templateUrl: 'views/book/book-details.html',
        controller: 'BookCtrl'
      })
      .when(rootUrl + '/settings', {
        templateUrl: 'views/settings/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider
      .translations('en-US', {
        APP_LIBRARY_TAB: 'All Books',
        APP_BORROWED_BOOKS_TAB: 'Borrowed Books',
        APP_WISHLIST_TAB: 'Wish List',
        APP_BOOK_BY: 'By',
        APP_BORROW: 'Borrow',
        APP_SEARCH: 'Search a book',
        APP_RETURN: 'Return',
        APP_ADD_BOOK: 'Add book to library',
        APP_ADD: 'Add',
        APP_MANUAL: 'Manual',
        APP_USER: 'User',
        APP_LANGUAGE: 'Language',
        APP_WAIT: 'Please, wait ',
        APP_LIBRARY_BROWSE_PROMPT: 'Select your library:',
        BOOK_BORROW_TITLE: 'Borrow Book',
        BOOK_RETURN_TITLE: 'Return Book',
        BOOK_NOT_FOUND: 'Sorry we can\'t find any match. Please enter book details manually.',
        BOOK_TITLE: 'Title',
        BOOK_SUBTITLE: 'Subtitle',
        BOOK_AUTHORS: 'Author(s)',
        BOOK_DESCRIPTION: 'About this book',
        BOOK_ISBN_13: 'ISBN 13',
        BOOK_PUBLISHER: 'Publisher',
        BOOK_PUBLICATION_DATE: 'Publication Date',
        BOOK_IMAGE_URL: 'Cover URL',
        BOOK_COVER: 'Cover',
        BOOK_NUMBER_OF_PAGES: 'Pages',
        BOOK_DONATOR: 'Donator',
        HTTP_CODE_409:'Ops! Process was not completed. Cause: Book requested is not available for do that.',
        HTTP_CODE_412:'Ops! Process was not completed. Cause: Email is required to make a loan',
        HTTP_CODE_428:'Ops! Process was not completed. Cause: This loan does not exists.',
        HTTP_CODE_500:'Ops! Process was not completed. Cause: Internal error',
        REQUIRED: '(Required Field)',
        INVALID_LIBRARY_ERROR: 'Oops! The library you are adding a book to is not registered with us.',
        RETURN_MESSAGE: 'are you returning this book?',
        APP_SETTINGS: 'Settings',
        APP_ADD_WISH: 'Add book to wishlist',
        BORROWED_BY: 'Borrowed by'
      })
      .translations('pt-BR', {
        APP_LIBRARY_TAB: 'Todos Os Livros',
        APP_BORROWED_BOOKS_TAB: 'Livros Emprestados',
        APP_WISHLIST_TAB: 'Lista de Desejos',
        APP_BOOK_BY: 'De',
        APP_BORROW: 'Pegar Emprestado',
        APP_SEARCH: 'Busca um livro',
        APP_RETURN: 'Devolver',
        APP_ADD_BOOK: 'Incluir livro na biblioteca',
        APP_MANUAL: 'Manual',
        APP_ADD: 'Incluir',
        APP_USER: 'Usuario',
        APP_LANGUAGE: 'Language',
        APP_WAIT: 'Por favor aguarde ',
        APP_LIBRARY_BROWSE_PROMPT: 'Selecione a sua biblioteca:',
        BOOK_BORROW_TITLE: 'Pegar O Livro Emprestado',
        BOOK_RETURN_TITLE: 'Devolver O Livro',
        BOOK_NOT_FOUND: 'Livro não encontrado. Por favor insira os dados manualmente.',
        BOOK_TITLE: 'Título',
        BOOK_SUBTITLE: 'Subtítulo',
        BOOK_AUTHORS: 'Autor(es)',
        BOOK_DESCRIPTION: 'Sobre este livro',
        BOOK_ISBN_13: 'ISBN 13',
        BOOK_PUBLISHER: 'Editora',
        BOOK_PUBLICATION_DATE: 'Data de Publicação',
        BOOK_IMAGE_URL: 'URL da Capa',
        BOOK_COVER: 'Capa',
        BOOK_NUMBER_OF_PAGES: 'Páginas',
        BOOK_DONATOR: 'Doador',
        HTTP_CODE_409:'Ops! Processo não realizado. Motivo: Livro solicitado está indisponível para o empréstimo.',
        HTTP_CODE_412:'Ops! Processo não realizado. Motivo: Email é obrigatório',
        HTTP_CODE_500:'Ops! Processo não realizado. Motivo: Problema interno',
        HTTP_CODE_428:'Ops! Processo não realizado. Motivo: Este emprestimo não existe.',
        REQUIRED: '(Campo Obrigatório)',
        INVALID_LIBRARY_ERROR: 'Desculpe, você está adiconando um livro em uma biblioteca que não está regirstrada.' ,
        RETURN_MESSAGE: 'você deseja realmente retornar este livro?',
        APP_SETTINGS: 'Configuração',
        APP_ADD_WISH: 'Incluir livro na lista de desejos',
        BORROWED_BY: 'Emprestado para'

      })
      .translations('es-EC', {
        APP_LIBRARY_TAB: 'Todos Los Libros',
        APP_BORROWED_BOOKS_TAB: 'Libros Prestados',
        APP_WISHLIST_TAB: 'Lista de Deseos',
        APP_BOOK_BY: 'De',
        APP_BORROW: 'Pedir Prestado',
        APP_RETURN: 'Devolver',
        APP_SEARCH: 'Buscar libro',
        APP_ADD_BOOK: 'Añadir libro a la biblioteca',
        APP_MANUAL: 'Manual',
        APP_ADD: 'Añadir',
        APP_USER: 'Usuario',
        APP_LANGUAGE: 'Lenguaje',
        APP_WAIT: 'Gracias por esperar',
        APP_LIBRARY_BROWSE_PROMPT: 'Escoge tu librería:',
        BOOK_BORROW_TITLE: 'Pedir prestado el libro',
        BOOK_RETURN_TITLE: 'Devolver Libro',
        BOOK_NOT_FOUND: 'Lo sentimos, no podemos encontrar coincidencias. Por favor ingresar los detalles manualmente.',
        BOOK_TITLE: 'Título',
        BOOK_SUBTITLE: 'Subtítulo',
        BOOK_AUTHORS: 'Autor(es)',
        BOOK_DESCRIPTION: 'Descripción',
        BOOK_ISBN_13: 'ISBN 13',
        BOOK_PUBLISHER: 'Editorial',
        BOOK_PUBLICATION_DATE: 'Fecha de Publicación',
        BOOK_IMAGE_URL: 'URL de la Imagen',
        BOOK_COVER: 'Imagen',
        BOOK_NUMBER_OF_PAGES: 'Páginas',
        BOOK_DONATOR: 'Donante',
        HTTP_CODE_409:'¡Ups! Proceso no realizado. Causa: El libro solicitado no está disponible para el préstamo.',
        HTTP_CODE_412:'¡Ups! Proceso no realizado. Causa: Es necesario su correo electrónico para el préstamo.',
        HTTP_CODE_500:'¡Ups! Proceso no realizado. Causa: Problema interno.' ,
        HTTP_CODE_428:'¡Ups! Proceso no realizado. Causa: Este préstamo no existe.',
        REQUIRED: '(Campo Obligatorio)',
        INVALID_LIBRARY_ERROR: '¡Ups! La librería a la que intenta agregar un libro no está registrada.',
        RETURN_MESSAGE: '¿Estás seguro de devolver este libro?',
        APP_SETTINGS: 'Configuración',
        APP_ADD_WISH: 'Añadir libro a la lista de deseos',
        BORROWED_BY: 'Prestado por'
      });

    $translateProvider.determinePreferredLanguage(function () {
      var language = $cookies.get('language');
      var defaultLanguage = 'en-US';
      var supportedLanguages = ['en-US', 'pt-BR', 'es-EC'];

      if (language === undefined) {
        language = window.navigator.language || window.navigator.userLanguage;

        var cookieLifespan = 365;
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + cookieLifespan);

        $cookies.put('language', language, {'expires': expireDate});
      }

      language = supportedLanguages.indexOf(language) === -1 ? defaultLanguage : language;

      return language;
    });
  }]).
  run(['$rootScope', '$http', '$location', 'ENV', function ($rootScope, $http, $location, ENV) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      var slug = next.pathParams.library;

      document.addEventListener('keyup', function(e) {
        if (e.keyCode === 27) {
          $rootScope.$broadcast('escapePressed', e.target);
        }
      });

      document.addEventListener('click', function(e) {
        $rootScope.$broadcast('documentClicked', e.target);
      });

      if (angular.isDefined(slug)) {
        var $cookies;

        angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
          $cookies = _$cookies_;
        }]);

        var cookieKey = 'libraries';
        var cookies = angular.isDefined($cookies.get(cookieKey)) ? $cookies.get(cookieKey).split(',') : [];

        if (cookies.indexOf(slug) === -1) {
          var endPoint = ENV.apiEndpoint + '/libraries/search/findBySlug?slug=' + slug;

          $http.get(endPoint).
            success(function (data) {
              if (angular.isDefined(data._embedded)) {
                cookies.push(data._embedded.libraries[0].slug);

                $cookies.put(cookieKey, cookies);
              } else {
                event.preventDefault();

                $location.path('/libraries');
              }
            });
        }
      }
    });
  }]);
