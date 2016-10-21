(function() {
  angular
    .module('nytBooks')
    .factory('UserHttpService', UserHttpService);

  UserHttpService.$inject = ['BaseHttpService', 'ConstantsService'];

  function UserHttpService(BaseHttpService, ConstantsService) {
    return {
      register: function(userData) {
        var url = ConstantsService.urls.SERVER_URL + '/api/user/register';

        return BaseHttpService.request('POST', url, userData);
      },
      login: function(userData) {
        var url = ConstantsService.urls.SERVER_URL + '/api/user/login';

        return BaseHttpService.request('POST', url, userData);
      }
    }
  }
})();