angular
  .module('nytBooks')
  .controller('BooksListController', BooksListController);

function BooksListController($scope, BooksListService) {
  $scope.list = 'hardcover-fiction';

  BooksListService.get({list: $scope.list}, function(response) {
    $scope.books = response.results;
  });
}

BooksListController.$inject = ['$scope', 'BooksListService'];