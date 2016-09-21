angular
  .module('nytBooks')
  .controller('FavoritesController', FavoritesController);

function FavoritesController(CustomCookiesService) {
  var favorites = CustomCookiesService.getFavoritesFromCookies();
}

FavoritesController.$inject = ['CustomCookiesService'];