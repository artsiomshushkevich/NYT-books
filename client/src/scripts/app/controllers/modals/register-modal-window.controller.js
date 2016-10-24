(function() {
  angular
    .module('nytBooks')
    .controller('RegisterModalWindowController', RegisterModalWindowController);
  
  RegisterModalWindowController.$inject = ['$scope', 'UserHttpService'];

  function RegisterModalWindowController($scope, UserHttpService) {
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
        firstname: $scope.firstname,
        lastname: $scope.lastname
      };

      UserHttpService.register(user)
        .then(function(reponse) {
          $scope.closeModalWindow();
        }, function(response) {
          $scope.areThereErrors = true;
          
          $scope.errors = response.data;
        });
    };
  }
})();