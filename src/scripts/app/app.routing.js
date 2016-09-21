angular
  .module('nytBooks')
  .config(config);

function config($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  
  $routeProvider.
    when('/', {
      templateUrl: '../templates/books.template.html',
      controller: BooksController
    }).
    when('/favorites', {
      templateUrl: '../templates/favorites.template.html',
      controller: FavoritesController
    }).
    otherwise({
      redirectTo: '/'
    });
}

config.$inject = ['$locationProvider', '$routeProvider'];