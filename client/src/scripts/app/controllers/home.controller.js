(function() {
  angular
    .module('nytBooks')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'CredentialsStorageService', '$location'];

  function HomeController($scope, CredentialsStorageService) {
    $scope.isRegisterModalWindowOpened = false;
    $scope.isLoginModalWindowOpened = false;

    $scope.toggleRegisterModalWindow = function() {
      if (CredentialsStorageService.getCredentials()) {
        
      }

      $scope.isRegisterModalWindowOpened = !$scope.isRegisterModalWindowOpened;
    };

    $scope.toggleLoginModalWindow = function() {
      $scope.isLoginModalWindowOpened = !$scope.isLoginModalWindowOpened;
    };
  }
})();