(function() {
  angular
    .module('nytBooks')
    .directive('infoModalWindowDirective', InfoModalWindowDirective);

  function InfoModalWindowDirective() {
    return {
      templateUrl: '../templates/modals/info-modal-window.template.html',
      scope: {
        bookData: '=',
        closeModalWindow: '&'
      }
    };
  }
})();


