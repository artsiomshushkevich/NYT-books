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
        confirmPassword: $scope.confirmPassword
      };

      if ($scope.firstname) {
        user.firstname = $scope.firstname;
      }

      if ($scope.lastname) {
        user.lastname = $scope.lastname;
      }

      UserHttpService.register(user)
        .then(function(reponse) {
          console.log(response);
        }, function(error) {
          $scope.areThereErrors = true;
          
        });
    };
  }

})();