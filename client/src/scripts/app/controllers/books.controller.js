(function() {
  angular
    .module('nytBooks')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', 'BooksHttpService', 'UserHttpService', 'ConstantsService', 'ProgressBarService','CredentialsStorageService','$location', '$q'];

  function BooksController($scope, BooksHttpService, UserHttpService, ConstantsService, ProgressBarService, CredentialsStorageService, $location, $q) {
    $scope.currentList = ConstantsService.DEFAULT_LIST;
    
    (function() {
      ProgressBarService.start();

      $q.all([
        BooksHttpService.getLists(),
        BooksHttpService.getBooksByList($scope.currentList),
        UserHttpService.getFavorites()
      ]).then(function(response) {
        ProgressBarService.complete();
         
        $scope.names = response[0].data.results;
        $scope.books = response[1].data.results;
        $scope.favorites = response[2].data;

        $scope.amountOfFavorites = $scope.favorites.length;
      });
    })();

    $scope.changeList = function() {
      ProgressBarService.start();
      
      BooksHttpService.getBooksByList($scope.currentList)
        .then(function(response) {
          $scope.books = response.data.results;
          ProgressBarService.complete();
        });
    };
    

    // $scope.isBookExistInFavorites = function(isbn) {
    //   var favorites = CustomCookiesService.getFavoritesFromCookies();
      
    //   for (var i = 0; i < favorites.length; i++) {
    //     if (favorites[i].isbn === isbn) {
    //       return true;
    //     }
    //   }
      
    //   return false;
    // };
    
    $scope.addToFavorites = function(isbnArg, listNameArg) {
      var newFavoriteBook = {
        isbn: isbnArg,
        listName: listNameArg
      };
      
      var isBookExist = false;
      
      for (var i = 0; i < $scope.favorites.length; i++) {
        if (favorites[i].isbn === isbnArg) {
          favorites.splice(i, 1);
          isBookExist = true;
          
          UserHttpService.deleteOneFavorite({

          })
          break;
        }
      }
      
      if (!isBookExist) {
        favorites.push(newFavoriteBook);
      }
      
      $scope.amountOfFavorites = favorites.length;
    };
    
    $scope.deleteAllFavorites = function() {
      UserHttpService.deleteAllFavorites()
        .then(function() {
          $scope.amountOfFavorites = 0;
          $scope.favorites = [];
        });
    };
    
    $scope.goToFavorites = function() {
      $location.path('/favorites');
    };
  }
})();



