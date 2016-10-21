(function() {
  angular
    .module('nytBooks')
    .factory('BaseHttpService', BaseHttpService);

    BaseHttpService.$inject = ['$http'];

    function BaseHttpService($http) {
      return {
        request: function(methodArg, urlArg, dataArg, headersArg) {
          var httpRequestConfig = {
            method: methodArg,
            url: urlArg
          };

          if (dataArg) {
            httpRequestConfig.data = dataArg;
          }
          
          if (headersArg) {
            httpRequestConfig.headers = headersArg;
          }
          
          return $http(httpRequestConfig);
        }
      }
    }
})();