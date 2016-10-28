(function() {
  angular
    .module('nytBooks')
    .config(Config)
    .run(CredentialsChecker);

  Config.$inject = ['$locationProvider', '$routeProvider'];

  function Config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    
    $routeProvider.
      when('/', {
        templateUrl: '../templates/main/home.template.html',
        controller: 'HomeController'
      }).
      when('/books', {
        templateUrl: '../templates/main/books.template.html',
        controller: 'BooksController'
      }).
      when('/favorites', {
        templateUrl: '../templates/main/favorites.template.html',
        controller: 'FavoritesController'
      }).
      otherwise({
        redirectTo: '/'
      })
  }

  CredentialsChecker.$inject = ['$rootScope', 'CredentialsStorageService','$location'];

  function CredentialsChecker($rootScope, CredentialsStorageService, $location) {
    $rootScope.$on('$routeChangeSuccess', function() {
      if (!CredentialsStorageService.getCredentials()) {
        $location.path('/');
      }
    });
  }
})();
