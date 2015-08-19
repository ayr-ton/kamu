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

    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/book/index.html',
        controller: 'BookCtrl'
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
        APP_RETURN: 'Return',
        APP_ADD_BOOK: 'Add book to library',
        APP_ADD: 'Add',
        APP_MANUAL: 'Manual',
        APP_USER: 'User',
        BOOK_BORROW_TITLE: 'Borrow Book',
        BOOK_NOT_FOUND: 'Sorry we can\'t find any match. Please enter book details manually.',
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
        APP_RETURN: 'Devolver',
        APP_ADD_BOOK: 'Incluir livro na biblioteca',
        APP_MANUAL: 'Manual',
        APP_ADD: 'Incluir',
        APP_USER: 'Usuario',
        BOOK_BORROW_TITLE: 'Pegar O Livro Emprestado',
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
        APP_RETURN: 'Regreso',
        APP_SEARCH: 'Busca',
        APP_ADD_BOOK: 'Añadir libro a la biblioteca',
        APP_MANUAL: 'Manual',
        APP_ADD: 'Adicionar',
        APP_USER: '',
        BOOK_BORROW_TITLE: '',
        BOOK_NOT_FOUND: 'Lo sentimos no podemos encontrar un resultado. Por favor ingresar manualmente.',
        BOOK_TITLE: 'Titulo',
        BOOK_SUBTITLE: 'Subtitulo',
        BOOK_AUTHORS: 'Autor(es)',
        BOOK_DESCRIPTION: 'Descripción',
        BOOK_ISBN_13: 'ISBN 13',
        BOOK_PUBLISHER: 'Publicador',
        BOOK_PUBLICATION_DATE: 'Fecha de Publicación',
        BOOK_IMAGE_URL: 'Imagen',
        BOOK_NUMBER_OF_PAGES: 'Páginas',
        BOOK_DONATOR: 'Donante'
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