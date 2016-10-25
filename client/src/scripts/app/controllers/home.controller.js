(function() {
  angular
    .module('nytBooks')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'CredentialsStorageService'];

  function HomeController($scope, CredentialsStorageService) {
    $scope.isRegisterModalWindowOpened = false;
    $scope.isLoginModalWindowOpened = false;

    $scope.toggleRegisterModalWindow = function() {
      var token = CredentialsStorageService.getCredentials();
      
      $scope.isRegisterModalWindowOpened = !$scope.isRegisterModalWindowOpened;
    };

    $scope.toggleLoginModalWindow = function() {
      $scope.isLoginModalWindowOpened = !$scope.isLoginModalWindowOpened;
    };
  }
})();