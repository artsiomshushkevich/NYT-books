(function() {
  angular
    .module('nytBooks')
    .factory('ConstantsService', ConstantsService);

  function ConstantsService() {
    return {
      urls: {
        BOOKS_URL: 'https://api.nytimes.com/svc/books/v3/lists.json',
        LISTS_URL: "https://api.nytimes.com/svc/books/v3/lists/names.json",
        SERVER_URL: 'http://localhost:3000',
      },
      DEFAULT_LIST: 'hardcover-fiction'
    }
  }
})();
