angular
  .module('nytBooks')
  .controller('BooksController', BooksController);

function BooksController($scope, $q, BooksService) {
//  $scope.currentList = ConstantsService.defaultList;
//  
//  $scope.changeList = function() {
//    BooksService.get({list: $scope.currentList}, function(response) {
//      $scope.books = response.results;
//    });
//  };
//  
//  $scope.changeList();
//  
//  NamesService.get({}, function(response) {
//    $scope.names = response.results.map(function(item) {
//      return {
//        displayName: item.display_name,
//        listName: item.list_name.replace(' ', '-') //url should contain hyphens instead spaces
//      };
//    });
  
//  });
  
  function getOneList(listName) {
    var deferObject =  $q.defer();
    
    BooksService.get({list: listName}, function(response) {
      deferObject.resolve(response);
    });
    
    return deferObject.promise;
  }
  
  $q.all([
    getOneList('Trade-Fiction-Paperback'),
    getOneList('Mass-Market-Paperback'),
    getOneList('Hardcover-Fiction'),
    getOneList('Hardcover-Nonfiction'),
    
  ]).then(function(responses) {
    $scope.tradeFiction = responses[0].results;
    $scope.massMarket = responses[1].results;
    $scope.hardcoverFiction = responses[2].results;
    $scope.hardcoverNonFiction = responses[3].results;
  })
  
}

BooksController.$inject = ['$scope', '$q' ,'BooksService'];