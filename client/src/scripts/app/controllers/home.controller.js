(function() {
  angular
    .module('nytBooks')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'CredentialsStorageService', '$location'];

  function HomeController($scope, CredentialsStorageService, $location) {
    $scope.isRegisterModalWindowOpened = false;
    $scope.isLoginModalWindowOpened = false;

    changeLocationAfterSuccessfulAuth();

    function changeLocationAfterSuccessfulAuth() {
      if (CredentialsStorageService.getCredentials()) {
        $location.path('/books');
      }
    }

    $scope.toggleRegisterModalWindow = function() {
      $scope.isRegisterModalWindowOpened = !$scope.isRegisterModalWindowOpened;
      
      $scope._changeLocationAfterSuccessfulAuth();
    };

    $scope.toggleLoginModalWindow = function() {
      $scope.isLoginModalWindowOpened = !$scope.isLoginModalWindowOpened;
      
      $scope._changeLocationAfterSuccessfulAuth();
    }; 
  }
})();