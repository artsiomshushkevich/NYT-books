angular
  .module('nytBooks')
  .controller('BooksController', BooksController);

function BooksController($scope, BooksService, NamesService, ConstantsService, ProgressBarService, CustomCookiesService, $location) {
  $scope.currentList = ConstantsService.defaultList;
  
  $scope.changeList = () => {
    ProgressBarService.start();
    
    BooksService.get({list: $scope.currentList}, (response) => {
      $scope.books = response.results;
      ProgressBarService.complete();
    });
  };
  
  $scope.isBookExistInFavorites = (isbn) => {
    let favorites = CustomCookiesService.getFavoritesFromCookies();
    
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].isbn === isbn) {
        return true;
      }
    }
    
    return false;
  };
  
  $scope.addToFavorites = (isbnArg, listNameArg) => {
    let favorites = CustomCookiesService.getFavoritesFromCookies();
    
    let newFavoriteBook = {
      isbn: isbnArg,
      listName: listNameArg
    };
    
    let isBookExist = false;
    
    for (let i = 0; i < favorites.length; i++) {
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
  
  $scope.favoritesButtonClick = ($event) => {
    if ($event.target.classList.contains('delete-favorites')) {
      CustomCookiesService.deleteAllFavoritesFromCookies();
      $scope.amountOfFavorites = 0;
    } else {
      $location.path('/favorites');
    }
  };
  
  $scope.changeList();
  
  $scope.amountOfFavorites = CustomCookiesService.getFavoritesFromCookies().length;
  
  NamesService.get({}, (response) => {
    $scope.names = response.results.map((item) => {
      item.list_name = item.list_name.replace(' ', '-'); //url should contain hyphens instead spaces
      return item;
    });
  });
}

BooksController.$inject = ['$scope', 'BooksService', 'NamesService', 'ConstantsService', 'ProgressBarService', 'CustomCookiesService','$location'];