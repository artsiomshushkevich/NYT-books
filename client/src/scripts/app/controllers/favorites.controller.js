angular
  .module('nytBooks')
  .controller('FavoritesController', FavoritesController);

function FavoritesController($scope, FavoritesService, CustomCookiesService, $location, ProgressBarService) {
  var favoritesPromise = FavoritesService.getFavoritesPromise();
  
  $scope.isModalWindowShowed = false;
  
  if (favoritesPromise) {
    ProgressBarService.start();
    
    favoritesPromise.then(function(favorites) {
      $scope.favorites = favorites;
      ProgressBarService.complete();
    });
  }
  
  $scope.showModalWindow = function(currentBook) {
    $scope.currentBook = currentBook;
    $scope.isModalWindowShowed = true;
  };
  
  $scope.closeModalWindow = function() {
    $scope.isModalWindowShowed = false;
  };
  
  $scope.deleteFromFavorites = function(deletedIsbn) {
    var favorites = CustomCookiesService.getFavoritesFromCookies();
    
    for (var i = 0; i < $scope.favorites.length; i++) {
      if ($scope.favorites[i].results[0].book_details[0].primary_isbn13 === deletedIsbn) {
        $scope.favorites.splice(i, 1);
        
        for (var j = 0; j < favorites.length; j++) {
          if (favorites[j].isbn === deletedIsbn) {
            favorites.splice(i, 1);
            CustomCookiesService.putFavoritesToCookies(favorites);
            
            break;
          }
        }
        
        break;
      }
    }
    
    if (favorites.length === 0) {
      $location.path('/');
    }
  };
}

FavoritesController.$inject = ['$scope', 'FavoritesService', 'CustomCookiesService', '$location', 'ProgressBarService'];