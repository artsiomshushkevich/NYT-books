(function() {
  angular
    .module('nytBooks')
    .directive('registerModalWindowDirective', RegisterModalWindowDirective);

  function RegisterModalWindowDirective() {
    return {
      templateUrl: '../templates/modals/register-modal-window.template.html',
      scope: {
        closeModalWindow: '&'
      },
      controller: '@',
      name: 'controllerName'
    };
  }
})();