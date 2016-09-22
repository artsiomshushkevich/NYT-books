angular
  .module('nytBooks')
  .controller('FavoritesController', FavoritesController);

function FavoritesController($scope, FavoritesService) {
  var favoritesPromise = FavoritesService.getFavoritesPromise();
  
  if (favoritesPromise) {
    favoritesPromise.then(function(favorites) {
      $scope.favorites = favorites;
    });
  }
}

FavoritesController.$inject = ['$scope', 'FavoritesService'];