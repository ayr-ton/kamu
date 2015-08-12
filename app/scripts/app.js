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
    'ngCookies'
  ])
  .config(function ($routeProvider, $translateProvider) {
    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
      $cookies = _$cookies_;
    }]);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/add_book',  {
        templateUrl: 'views/book/add-book.html',
        controller: 'BookCtrl'
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
        APP_ADD_BOOK: 'Add book to library',
        APP_ADD: 'Add',
        APP_MANUAL: 'Manual',
        BOOK_NOT_FOUND: "Sorry we can't find any match. Please enter manually.",
        BOOK_TITLE: 'Title',
        BOOK_SUBTITLE: 'Subtitle',
        BOOK_AUTHORS: 'Author(s)',
        BOOK_DESCRIPTION: 'About this book',
        BOOK_ISBN_13: 'ISBN 13',
        BOOK_PUBLISHER: 'Publisher',
        BOOK_PUBLICATION_DATE: 'Publication Date',
        BOOK_IMAGE_URL: 'Cover',
        BOOK_NUMBER_OF_PAGES: 'Pages',
        BOOK_DONATOR: 'Donator'
      })
      .translations('pt-BR', {
        APP_LIBRARY_TAB: 'Todos Os Livros',
        APP_BORROWED_BOOKS_TAB: 'Livros Emprestados',
        APP_WISHLIST_TAB: 'Lista de Desejos',
        APP_BOOK_BY: 'De',
        APP_BORROW: 'Pegar Emprestado',
        APP_SEARCH: 'Busca',
        APP_ADD_BOOK: 'Incluir livro na biblioteca',
        APP_MANUAL: 'Manual',
        APP_ADD: 'Incluir',
        BOOK_NOT_FOUND: 'Livro não encontrado. Por favor insira os dados manualmente.',
        BOOK_TITLE: 'Título',
        BOOK_SUBTITLE: 'Subtítulo',
        BOOK_AUTHORS: 'Autor(es)',
        BOOK_DESCRIPTION: 'Sobre este livro',
        BOOK_ISBN_13: 'ISBN 13',
        BOOK_PUBLISHER: 'Editora',
        BOOK_PUBLICATION_DATE: 'Data de Publicação',
        BOOK_IMAGE_URL: 'Capa',
        BOOK_NUMBER_OF_PAGES: 'Páginas',
        BOOK_DONATOR: 'Doador'
      })
      .translations('es-EC', {
        APP_LIBRARY_TAB: 'Todos Los Libros',
        APP_BORROWED_BOOKS_TAB: 'Libros Prestados',
        APP_WISHLIST_TAB: 'Lista',
        APP_BOOK_BY: 'De',
        APP_BORROW: 'Pedir Prestado',
        APP_SEARCH: 'Busca',
        APP_ADD_BOOK: '',
        APP_MANUAL: '',
        APP_ADD: '',
        BOOK_NOT_FOUND: '',
        BOOK_TITLE: 'Titulo',
        BOOK_SUBTITLE: '',
        BOOK_AUTHORS: '',
        BOOK_DESCRIPTION: '',
        BOOK_ISBN_13: '',
        BOOK_PUBLISHER: '',
        BOOK_PUBLICATION_DATE: '',
        BOOK_IMAGE_URL: '',
        BOOK_NUMBER_OF_PAGES: '',
        BOOK_DONATOR: ''
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

  });