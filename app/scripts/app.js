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
    'ui.mask'
  ])
  .config(function ($routeProvider, $translateProvider) {
    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
      $cookies = _$cookies_;
    }]);

    var rootUrl = '/library/:library';

    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
      .when(rootUrl, {
        templateUrl: 'views/book/index.html',
        controller: 'BookCtrl'
      })
      .when(rootUrl + '/add_book',  {
        templateUrl: 'views/book/add-book.html',
        controller: 'BookCtrl'
      })
      .when('/', {
        templateUrl: 'views/library/index.html',
        controller: 'LibraryCtrl'
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
        APP_SEARCH: 'Search',
        APP_RETURN: 'Return',
        APP_ADD_BOOK: 'Add book to library',
        APP_ADD: 'Add',
        APP_MANUAL: 'Manual',
        APP_USER: 'User',
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
        HTTP_CODE_409:'Book requested is not available for do that.',
        HTTP_CODE_412:'Email is required to make a loan',
        HTTP_CODE_500:'Internal error', 
        REQUIRED: '(Required Field)'
      })
      .translations('pt-BR', {
        APP_LIBRARY_TAB: 'Todos Os Livros',
        APP_BORROWED_BOOKS_TAB: 'Livros Emprestados',
        APP_WISHLIST_TAB: 'Lista de Desejos',
        APP_BOOK_BY: 'De',
        APP_BORROW: 'Pegar Emprestado',
        APP_SEARCH: 'Busca',
        APP_RETURN: 'Devolver',
        APP_ADD_BOOK: 'Incluir livro na biblioteca',
        APP_MANUAL: 'Manual',
        APP_ADD: 'Incluir',
        APP_USER: 'Usuario',
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
        HTTP_CODE_409:'Livro solicitado está indisponível para o empréstimo.',
        HTTP_CODE_412:'Email é obrigatório',
        HTTP_CODE_500:'Problema interno',
        REQUIRED: '(Campo Obrigatório)' 

      })
      .translations('es-EC', {
        APP_LIBRARY_TAB: 'Todos Los Libros',
        APP_BORROWED_BOOKS_TAB: 'Libros Prestados',
        APP_WISHLIST_TAB: 'Lista de Deseos',
        APP_BOOK_BY: 'De',
        APP_BORROW: 'Pedir Prestado',
        APP_RETURN: 'Devolver',
        APP_SEARCH: 'Buscar',
        APP_ADD_BOOK: 'Añadir libro a la biblioteca',
        APP_MANUAL: 'Manual',
        APP_ADD: 'Añadir',
        APP_USER: 'Usuario',
        BOOK_BORROW_TITLE: 'Pedir préstamo de libro',
        BOOK_RETURN_TITLE: 'Devolver Libro',
        BOOK_NOT_FOUND: 'Lo sentimos, no podemos encontrar coincidencias. Por favor ingresar los detalles manualmente.',
        BOOK_TITLE: 'Título',
        BOOK_SUBTITLE: 'Subtítulo',
        BOOK_AUTHORS: 'Autor(es)',
        BOOK_DESCRIPTION: 'Descripción',
        BOOK_ISBN_13: 'ISBN 13',
        BOOK_PUBLISHER: 'Publicador',
        BOOK_PUBLICATION_DATE: 'Fecha de Publicación',
        BOOK_IMAGE_URL: 'URL de la Imagen',
        BOOK_COVER: 'Imagen',
        BOOK_NUMBER_OF_PAGES: 'Páginas',
        BOOK_DONATOR: 'Donante',
        HTTP_CODE_409:'El libro solicitado no está disponible para el préstamo',
        HTTP_CODE_412:'Es necesario su correo electrónico para el préstamo',
        HTTP_CODE_500:'Problema interno' ,
        REQUIRED: '(Campo Obrigatório)'
      });

    $translateProvider.determinePreferredLanguage(function(){
      var language = $cookies.get('language');
      var defaultLanguage = 'en-US';
      var supportedLanguages = ['en-US', 'pt-BR', 'es-EC'];

      if (language === null) {
        language = navigator.language || navigator.userLanguage;

        var cookieLifespan = 365;
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + cookieLifespan);

        $cookies.put('language', language, { 'expires' : expireDate });
      }

      language = supportedLanguages.indexOf(language) === -1 ? defaultLanguage : language;

      return language;
    });

  }).run(function($rootScope, $http, $location, ENV) {
     $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        event.preventDefault();

        var currentPath = $location.path();

        if (['/'].indexOf(currentPath) === -1) {
          var currentLibrary = angular.isDefined(current.pathParams) ? current.pathParams.library : undefined;
          var previousLibrary = angular.isDefined(previous) ? (angular.isDefined(previous.pathParams) ? previous.pathParams.library : undefined) : undefined;

          if (previousLibrary !== currentLibrary && angular.isDefined(currentLibrary)) {
            var endPoint = ENV.apiEndpoint + '/library/' + currentLibrary;

            $http.get(endPoint).
              success(function(data) {
                $rootScope.library = data;
              });
          }
        }
      });
  });