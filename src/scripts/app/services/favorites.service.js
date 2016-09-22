angular
  .module('nytBooks')
  .factory('FavoritesService', FavoritesService);

function FavoritesService($q, BooksService, CustomCookiesService) {
  return {
    getFavoritesPromise: function() {
      var favorites = CustomCookiesService.getFavoritesFromCookies();

      if (favorites.length !== 0) {
        var arrayOfFavoritesPromises = favorites.map(function(favoriteBook) {
          return getFavoriteBook(favoriteBook.isbn, favoriteBook.listName);
        });
        
        return $q.all(arrayOfFavoritesPromises);
      } else {
        return null;
      }
    }
  };
 
  function getFavoriteBook(isbnArg, listNameArg) {
    var deferObject = $q.defer();
    
    BooksService.get({
      isbn: isbnArg,
      list: listNameArg
    },
    function(response) {
      console.dir(response.results);
      
      deferObject.resolve(response);
    });
    
    return deferObject.promise;
  }
}

FavoritesService.$inject = ['$q', 'BooksService', 'CustomCookiesService']