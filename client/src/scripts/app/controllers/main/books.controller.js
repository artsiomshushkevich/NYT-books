(function() {
  angular
    .module('nytBooks')
    .controller('BooksController', BooksController);

  BooksController.$inject = [
    '$scope', 
    'BooksHttpService', 
    'UserHttpService', 
    'ConstantsService', 
    'ProgressBarService',
    'CredentialsStorageService',
    '$location', 
    '$q'
  ];

  function BooksController($scope, 
                           BooksHttpService, 
                           UserHttpService, 
                           ConstantsService, 
                           ProgressBarService, 
                           CredentialsStorageService, 
                           $location, 
                           $q) {
    $scope.currentList = ConstantsService.DEFAULT_LIST;
    $scope.isModalWindowShowed = false;
    $scope.isUpdateModalWindowShowed = false;

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

    $scope.toggleUpdateModalWindow = function() {
      $scope.isUpdateModalWindowShowed = !$scope.isUpdateModalWindowShowed;
    };

    $scope.changeList = function() {
      ProgressBarService.start();
      
      BooksHttpService.getBooksByList($scope.currentList)
        .then(function(response) {
          $scope.books = response.data.results;

          ProgressBarService.complete();
        });
    };
    

    $scope.isBookExistInFavorites = function(isbn) {
      for (var i = 0; i < $scope.favorites.length; i++) {
        if ($scope.favorites[i].isbn === isbn) {
          return true;
        }
      }
      
      return false;
    };
    
    $scope.addToFavorites = function(isbnArg, listNameArg) {
      var newFavoriteBook = {
        isbn: isbnArg,
        listname: listNameArg
      };
      
      var isBookExist = false;
      
      for (var i = 0; i < $scope.favorites.length; i++) {
        if ($scope.favorites[i].isbn === isbnArg) {
          $scope.favorites.splice(i, 1);
          isBookExist = true;
      
          break;
        }
      }
      
      if (!isBookExist) {
        $scope.favorites.push(newFavoriteBook);

        UserHttpService.addToFavorites(newFavoriteBook);
      } else {
        UserHttpService.deleteOneFavorite(newFavoriteBook);
      }
      
    };
    
    $scope.deleteAllFavorites = function() {
      UserHttpService.deleteAllFavorites()
        .then(function() {
          $scope.favorites = [];
        });
    };
    
    $scope.goToFavorites = function() {
      $location.path('/favorites');
    };

    $scope.logout = function() {
      CredentialsStorageService.setCredentials(null);

      $location.path('/');
    };
  }
})();



