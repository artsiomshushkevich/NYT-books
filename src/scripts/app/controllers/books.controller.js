angular
  .module('nytBooks')
  .controller('BooksController', BooksController);

function BooksController($scope, BooksService, NamesService, ConstantsService) {
  $scope.currentList = ConstantsService.defaultList;
  
  $scope.changeList = function() {
    BooksService.get({list: $scope.currentList}, function(response) {
      $scope.books = response.results;
    });
  };
  
  $scope.changeList();
  
  NamesService.get({}, function(response) {
    $scope.names = response.results.map(function(item) {
      return {
        displayName: item.display_name,
        listName: item.list_name.replace(' ', '-') //url should contain hyphens instead spaces
      };
    });
  });
}

BooksController.$inject = ['$scope', 'BooksService', 'NamesService', 'ConstantsService'];