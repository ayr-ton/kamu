'use strict';

angular
  .module('libraryUiApp')
  .service('UserService', ['md5', '$window', '$http', 'ENV', function (md5, $window, $http, ENV) {
    var email = $window.sessionStorage.email;

    this.getGravatarFromUserEmail = function(email){
      var hashedEmail = md5.createHash(email);
      return 'http://www.gravatar.com/avatar/' + hashedEmail;
    };

    this.getGravatarFromSession = function(){
      return this.getGravatarFromUserEmail(email);
    };

    this.getUserByEmail = function(email){
       var endPoint = ENV.apiEndpoint.concat('/users/search/findByEmail?email=').concat(email);

      return $http.get(endPoint);
    };
  }]);
