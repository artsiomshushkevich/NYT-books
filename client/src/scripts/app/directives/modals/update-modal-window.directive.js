(function() {
  angular
    .module('nytBooks')
    .directive('updateModalWindowDirective', UpdateModalWindowDirective);

  function UpdateModalWindowDirective() {
    return {
      templateUrl: '../templates/modals/update-modal-window.template.html',
      scope: {
        closeModalWindow: '&'
      },
      controller: '@',
      name: 'controllerName'
    };
  }
})();