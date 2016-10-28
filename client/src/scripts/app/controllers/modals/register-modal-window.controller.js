(function() {
  angular
    .module('nytBooks')
    .controller('RegisterModalWindowController', RegisterModalWindowController);
  
  RegisterModalWindowController.$inject = ['$scope', 'UserHttpService', 'CredentialsStorageService'];

  function RegisterModalWindowController($scope, UserHttpService, CredentialsStorageService) {
    $scope.errors = [];
    $scope.areThereErrors = false;

    $scope.closeErrorsBox = function() {
      $scope.areThereErrors = false;
    };

    $scope.register = function(event) {
      var user = {
        username: $scope.username,
        password: $scope.password,
        confirmPassword: $scope.confirmPassword,
      };

      UserHttpService.register(user)
        .then(function(response) {
          CredentialsStorageService.setCredentials(response.data);
          
          $scope.closeModalWindow();
        }, function(response) {
          $scope.areThereErrors = true;
          
          $scope.errors = response.data;
        });
    };
  }
})();