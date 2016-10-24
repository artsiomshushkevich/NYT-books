(function() {
  angular
    .module('nytBooks')
    .directive('errorsBoxDirective', ErrorsBoxDirective);

  function ErrorsBoxDirective() {
    return {
      templateUrl: '../templates/modals/errors-box.template.html',
      scope: {
        errors: '=',
        closeErrorsBox: '&'
      }
    }
  }

})();