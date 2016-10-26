(function() {
  angular
    .module('nytBooks')
    .factory('UserHttpService', UserHttpService);

  UserHttpService.$inject = ['BaseHttpService', 'ConstantsService', 'CredentialsStorageService'];

  function UserHttpService(BaseHttpService, ConstantsService, CredentialsStorageService) {
    return {
      register: function(data) {
        var url = ConstantsService.urls.SERVER_URL + '/api/user/register';

        return BaseHttpService.request('POST', url, data);
      },
      login: function(data) {
        var url = ConstantsService.urls.SERVER_URL + '/api/user/login';

        return BaseHttpService.request('POST', url, data);
      },
      _getAuthorizationHeader: function() {
        return {
          'Authorization': 'Bearer ' + CredentialsStorageService.getCredentials().token
        };
      },
      addToFavorites: function(data) {
        var url = ConstantsService.urls.SERVER_URL + '/api/user/favorites/add-one';
        data.username = CredentialsStorageService.getCredentials().username;

        return BaseHttpService.request('POST', url, data, this._getAuthorizationHeader());
      },
      getFavorites: function() {
        var url = ConstantsService.urls.SERVER_URL + 
                  '/api/user/favorites/get-all/' + 
                  CredentialsStorageService.getCredentials().username;

        return BaseHttpService.request('GET', url, null, this._getAuthorizationHeader());
      },
      deleteOneFavorite: function(data) {
        var url = ConstantsService.urls.SERVER_URL + '/api/user/favorites/delete-one';
        data.username = CredentialsStorageService.getCredentials().username;

        return BaseHttpService.request('PUT', url, data, this._getAuthorizationHeader());
      },
      deleteAllFavorites: function() {
        var url = ConstantsService.urls.SERVER_URL + '/api/user/favorites/delete-all';
        var data = {
          username: CredentialsStorageService.getCredentials().username
        };

        return BaseHttpService.request('PUT', url, data, this._getAuthorizationHeader());
      }
    }
  }
})();