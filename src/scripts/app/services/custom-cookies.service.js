angular
  .module('nytBooks')
  .factory('CustomCookiesService', CustomCookiesService);

function CustomCookiesService($cookies) {
  return {
    getFavoritesFromCookies: function() {
      var favoritesCookies  = $cookies.get('favorites');
      var favorites = [];

      if (favoritesCookies) {
        favorites = JSON.parse(favoritesCookies);
      } 

      return favorites;
    },
    
    putFavoritesToCookies: function(favorites) {
      $cookies.put('favorites', JSON.stringify(favorites));
    }, 
    
    deleteAllFavoritesFromCookies: function() {
      $cookies.remove('favorites');
    }
  };
}

CustomCookiesService.$inject = ['$cookies'];