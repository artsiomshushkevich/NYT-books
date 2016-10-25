(function() {
  angular
    .module('nytBooks')
    .controller('LoginModalWindowController', LoginModalWindowController);
  
  LoginModalWindowController.$inject = ['$scope', 'UserHttpService', 'CredentialsStorageService'];

  function LoginModalWindowController($scope, UserHttpService, CredentialsStorageService) {
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