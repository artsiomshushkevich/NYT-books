angular
  .module('nytBooks')
  .factory('FavoritesService', FavoritesService);

function FavoritesService($q, BooksService, CustomCookiesService, $timeout) {
  return {
    getFavoritesPromise: function() {
      var favorites = CustomCookiesService.getFavoritesFromCookies();
      var arrayOfFavorites = [];
      var i = 0;
      var deferObject = $q.defer();
      
      if (favorites !== 0) {
        nextIteration(); 
      }
      
      function nextIteration() {
        if (i < favorites.length) {
          getFavoriteBook(favorites[i].isbn, favorites[i].listName)
            .then(function(favoriteBook) {
              arrayOfFavorites.push(favoriteBook);
              i++;
            
              $timeout(function() {
                nextIteration(); 
              }, 100);
          });
        }
        else {
          deferObject.resolve(arrayOfFavorites);
        }
      }
      
      return deferObject.promise;
    }
  };

  function getFavoriteBook(isbnArg, listNameArg) {
    var deferObject = $q.defer();
    
    BooksService.get({
      isbn: isbnArg,
      list: listNameArg
    },
    function(response) {
      deferObject.resolve(response);
    });
    
    return deferObject.promise;
  }
}

FavoritesService.$inject = ['$q', 'BooksService', 'CustomCookiesService', '$timeout'];