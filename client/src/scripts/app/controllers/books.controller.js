angular
  .module('nytBooks')
  .controller('BooksController', BooksController);

function BooksController($scope, BooksService, NamesService, ConstantsService, ProgressBarService, CustomCookiesService, $location) {
  $scope.currentList = ConstantsService.defaultList;
  
  $scope.changeList = function() {
    ProgressBarService.start();
    
    BooksService.get({list: $scope.currentList}, function(response) {
      $scope.books = response.results;
      ProgressBarService.complete();
    });
  };
  
  $scope.isBookExistInFavorites = function(isbn) {
    var favorites = CustomCookiesService.getFavoritesFromCookies();
    
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].isbn === isbn) {
        return true;
      }
    }
    
    return false;
  };
  
  $scope.addToFavorites = function(isbnArg, listNameArg) {
    var favorites = CustomCookiesService.getFavoritesFromCookies();
    
    var newFavoriteBook = {
      isbn: isbnArg,
      listName: listNameArg
    };
    
    var isBookExist = false;
    
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].isbn === isbnArg) {
        favorites.splice(i, 1);
        isBookExist = true;
        break;
      }
    }
    
    if (!isBookExist) {
      favorites.push(newFavoriteBook);
    }
    
    $scope.amountOfFavorites = favorites.length;
    CustomCookiesService.putFavoritesToCookies(favorites);
  };
  
  $scope.deleteAllFavorites = function() {
    CustomCookiesService.deleteAllFavoritesFromCookies();
    $scope.amountOfFavorites = 0;
  };
  
  $scope.goToFavorites = function() {
    $location.path('/favorites');
  };
  
  $scope.changeList();
  
  $scope.amountOfFavorites = CustomCookiesService.getFavoritesFromCookies().length;
  
  NamesService.get({}, function(response) {
    $scope.names = response.results.map(function(item) {
      item.list_name = item.list_name.replace(' ', '-'); //url should contain hyphens instead spaces
      return item;
    });
  });
}

BooksController.$inject = ['$scope', 'BooksService', 'NamesService', 'ConstantsService', 'ProgressBarService', 'CustomCookiesService','$location'];