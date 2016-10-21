(function() {
  angular
    .module('nytBooks')
    .config(Config);

  Config.$inject = ['$locationProvider', '$routeProvider'];

  function Config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    
    $routeProvider.
      when('/', {
        templateUrl: '../templates/controllers/home.template.html',
        controller: 'HomeController'
      }).
      when('/books', {
        templateUrl: '../templates/controllers/books.template.html',
        controller: 'BooksController'
      }).
      when('/favorites', {
        templateUrl: '../templates/controllers/favorites.template.html',
        controller: 'FavoritesController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
})();
