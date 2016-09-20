angular
  .module('nytBooks')
  .directive('nytBooksDirective', function() {
    return {
      scope: {
        booksInfo: '=booksInfo'
      },
      templateUrl: '../templates/list.template.html'
    }
});