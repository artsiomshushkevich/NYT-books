(function() {
  angular
    .module('nytBooks')
    .controller('FavoritesController', FavoritesController);
  
  FavoritesController.$inject = ['$scope', 'UserHttpService', 'BooksHttpService', 'FavoritesService', '$location', 'ProgressBarService'];

  function FavoritesController($scope, UserHttpService, BooksHttpService, FavoritesService, $location, ProgressBarService) {
    $scope.isModalWindowShowed = false;
    
    function redirectIsThereAreNotFavorites() {
      if ($scope.favorites.length === 0) {
        $location.path('/');
      }
    } 
      
    (function() {
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

              redirectIsThereAreNotFavorites();
            });
        });
    })();

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
      for (var i = 0; i < $scope.favorites.length; i++) {
        if ($scope.favorites[i].results[0].book_details[0].primary_isbn13 === deletedIsbn) {
          $scope.favorites.splice(i, 1);
          
          UserHttpService.deleteOneFavorite({isbn: deletedIsbn});
          
          break;
        }
      }
      
      redirectIsThereAreNotFavorites();
    };
  }

})();
