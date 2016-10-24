(function() {
  angular
    .module('nytBooks')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];

  function HomeController($scope) {
    $scope.isRegisterModalWindowOpened = false;
    $scope.isLoginModalWindowOpened = false;

    $scope.toggleRegisterModalWindow = function() {
      $scope.isRegisterModalWindowOpened = !$scope.isRegisterModalWindowOpened;
    };

    $scope.toggleLoginModalWindow = function() {
      $scope.isLoginModalWindowOpened = !$scope.isLoginModalWindowOpened;
    };
  }
})();