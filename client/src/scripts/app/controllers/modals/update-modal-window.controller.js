(function() {
  angular
    .module('nytBooks')
    .controller('UpdateModalWindowController', UpdateModalWindowController);
  
  UpdateModalWindowController.$inject = ['$scope', 'UserHttpService', 'CredentialsStorageService'];

  function UpdateModalWindowController($scope, UserHttpService, CredentialsStorageService) {
    $scope.errors = [];
    $scope.areThereErrors = false;
    $scope.oldUsername = CredentialsStorageService.getCredentials().username;
    $scope.newUsername = $scope.oldUsername;

    $scope.closeErrorsBox = function() {
      $scope.areThereErrors = false;
    };

    $scope.update = function() {
      var user = {
        oldUsername: $scope.oldUsername,
        oldPassword: $scope.oldPassword,
        newUsername: $scope.newUsername,
        newPassword: $scope.newPassword,
        confirmPassword: $scope.confirmPassword
      };

      UserHttpService.update(user)
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