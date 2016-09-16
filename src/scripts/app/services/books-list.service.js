angular
  .module('nytBooks')
  .factory('BooksListService', BooksListService);

function BooksListService($resource) {
  var API_KEY = '3a1e141439d84f62ad4440e6a2d96e77';
  var VERSION = 'v3';
  var FORMAT = 'json';
  
  return $resource('https://api.nytimes.com/svc/books/:version/lists.:format', {
    version: VERSION,
    format: FORMAT,
    'api-key': API_KEY
  }); 
}

BooksListService.$inject = ['$resource'];