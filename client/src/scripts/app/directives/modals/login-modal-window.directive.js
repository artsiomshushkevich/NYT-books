(function() {
  angular
    .module('nytBooks')
    .directive('loginModalWindowDirective', LoginModalWindowDirective);

  function LoginModalWindowDirective() {
    return {
      templateUrl: '../templates/modals/login-modal-window.template.html',
      scope: {
        closeModalWindow: '&'
      },
      controller: '@',
      name: 'controllerName'
    }
  }
})();