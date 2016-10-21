(function() {
  angular
    .module('nytBooks')
    .factory('BooksHttpService', BooksHttpService);

  BooksHttpService.$inject = ['BaseHttpService', 'ConstantsService'];

  function BooksHttpService(BaseHttpService, ConstantsService) {
    return {
      getBooksByList: function(list) {
        var url = ConstantsService.urls.BOOKS_URL + '?list=' + list;
        
        return BaseHttpService.request('GET', url);
      },
      getLists: function() {
        return BaseHttpService.request('GET', ConstantsService.urls.LISTS_URL);
      }
    }
  }
})();