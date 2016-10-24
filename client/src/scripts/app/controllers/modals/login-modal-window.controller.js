(function() {
  angular
    .module('nytBooks')
    .controller('LoginModalWindowController', LoginModalWindowController);
  
  LoginModalWindowController.$inject = ['$scope', 'UserHttpService'];

  function LoginModalWindowController($scope, UserHttpService) {
    $scope.errors = [];
    $scope.areThereErrors = false;

    $scope.closeErrorsBox = function() {
      $scope.areThereErrors = false;
    };

    $scope.login = function() {
      var user = {
        username: $scope.username,
        password: $scope.password
      };

      UserHttpService.login(user)
        .then(function(reponse) {
          $scope.closeModalWindow();
        }, function(response) {
          $scope.areThereErrors = true;
          
          $scope.errors = response.data;
        });
    };
  }
})();