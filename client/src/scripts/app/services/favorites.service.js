(function() {
  angular
    .module('nytBooks')
    .factory('FavoritesService', FavoritesService);

  FavoritesService.$inject = ['$q', 'BooksHttpService', '$timeout'];

  function FavoritesService($q, BooksHttpService, $timeout) {
    return {
      getFavoritesPromise: function(favorites) {
        var arrayOfFavorites = [];
        var i = 0;
        var deferObject = $q.defer();
        
        if (favorites !== 0) {
          nextIteration(); 
        }
        
        function nextIteration() {
          if (i < favorites.length) {
            BooksHttpService.getBookByIsbn(favorites[i].listname, favorites[i].isbn)
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
  }
})();

