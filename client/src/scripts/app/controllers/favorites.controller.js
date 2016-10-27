(function() {
  angular
    .module('nytBooks')
    .controller('FavoritesController', FavoritesController);
  
  FavoritesController.$inject = ['$scope', 'UserHttpService', 'BooksHttpService', 'FavoritesService', '$location', 'ProgressBarService'];

  function FavoritesController($scope, UserHttpService, BooksHttpService, FavoritesService, $location, ProgressBarService) {
    $scope.isModalWindowShowed = false;
    
    getFavorites();

    function getFavorites() {
      ProgressBarService.start();

      UserHttpService.getFavorites()
        .then(function(response) {
          var favorites = response.data;
          
          FavoritesService.getFavoritesPromise(favorites)
            .then(function(response) {
              ProgressBarService.complete();

              $scope.favorites = response.map(function(item) {
                return item.data;
              });

              if ($scope.favorites.length === 0) {
                $location.path('/');
              }
            });
        });
    }

    $scope.showModalWindow = function(list, isbn) {
      BooksHttpService.getBookByIsbn(list, isbn)
        .then(function(response) {
          $scope.currentBook = response.data;
          $scope.isModalWindowShowed = true;
        });
    };
    
    $scope.closeModalWindow = function() {
      $scope.isModalWindowShowed = false;
    };
    
    $scope.deleteFromFavorites = function(deletedIsbn) { 
      UserHttpService.deleteOneFavorite({isbn: deletedIsbn})
        .then(function() {
          getFavorites();
        });
    };
  }
})();
