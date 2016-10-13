angular
  .module('nytBooks')
  .directive('modalWindowDirective', modalWindowDirective);

function modalWindowDirective() {
  return {
    templateUrl: '../templates/modal-window.template.html',
    scope: {
      bookData: '=',
      closeModalWindow: '&'
    }
  };
}