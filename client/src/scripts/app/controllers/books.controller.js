(function() {
  angular
    .module('nytBooks')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', 'BooksHttpService', 'ConstantsService', 'ProgressBarService','CredentialsStorageService','$location'];

  function BooksController($scope, BooksHttpService, ConstantsService, ProgressBarService, CredentialsStorageService, $location) {
    // if (!CredentialsStorageService.getCredentials()) {
    //   $location.path('/');
    //   return;
    // }

    $scope.currentList = ConstantsService.DEFAULT_LIST;
    
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
    
    // $scope.addToFavorites = function(isbnArg, listNameArg) {
    //   var favorites = CustomCookiesService.getFavoritesFromCookies();
      
    //   var newFavoriteBook = {
    //     isbn: isbnArg,
    //     listName: listNameArg
    //   };
      
    //   var isBookExist = false;
      
    //   for (var i = 0; i < favorites.length; i++) {
    //     if (favorites[i].isbn === isbnArg) {
    //       favorites.splice(i, 1);
    //       isBookExist = true;
    //       break;
    //     }
    //   }
      
    //   if (!isBookExist) {
    //     favorites.push(newFavoriteBook);
    //   }
      
    //   $scope.amountOfFavorites = favorites.length;
    //   CustomCookiesService.putFavoritesToCookies(favorites);
    // };
    
    // $scope.deleteAllFavorites = function() {
    //   CustomCookiesService.deleteAllFavoritesFromCookies();
    //   $scope.amountOfFavorites = 0;
    // };
    
    $scope.goToFavorites = function() {
      $location.path('/favorites');
    };
    
    $scope.changeList();
    
    // $scope.amountOfFavorites = CustomCookiesService.getFavoritesFromCookies().length;

  }
})();



