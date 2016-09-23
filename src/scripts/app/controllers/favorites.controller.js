angular
  .module('nytBooks')
  .controller('FavoritesController', FavoritesController);

function FavoritesController($scope, FavoritesService, custo) {
  var favoritesPromise = FavoritesService.getFavoritesPromise();
  
  if (favoritesPromise) {
    favoritesPromise.then(function(favorites) {
      $scope.favorites = favorites;
    });
  }
  
  $scope.deteleFromFavorites = function(deletedIsbn) {
    var favorites = CustomCookiesService.getFavoritesFromCookies();
    
    for (var i = 0; i < $scope.favorites.length; i++) {
      if ($scope.favorites[i].results[0].book_details[0].primary_isbn13 === deletedIsbn) {
        $scope.favorites.splice(i, 1);
        
        for (var j = 0; j < favorites.length; j++) {
          if (favorites.isbn === deletedIsbn) {
            favorites.splice(i, 1);
            CustomCookiesService.putFavoritesToCookies(favorites);
            
            break;
          }
        }
        
        break;
      }
    }
  };
}

FavoritesController.$inject = ['$scope', 'FavoritesService', 'CustomCookiesService'];