(function() {
  angular
    .module('nytBooks')
    .factory('CredentialsStorageService', CredentialsStorageService);
  
  function CredentialsStorageService() {
    return {
      getCredentials: function() {
        return JSON.parse(localStorage.getItem('crd'));
      },
      setCredentials: function(credentials) {
        localStorage.setItem('crd', JSON.stringify(credentials));
      }
    };
  }
})();