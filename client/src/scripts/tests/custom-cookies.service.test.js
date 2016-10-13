describe('CustomCookiesService', function() {
  var $cookies, CustomCookiesService;
  
  beforeEach(function() {
    module('nytBooks');
    
    inject(function($injector) {
      $cookies = $injector.get('$cookies');
      CustomCookiesService = $injector.get('CustomCookiesService');
    });
  });
  
  describe('#putFavoritestoCookies', function() {
    var testArrayOfFavorites;
    
    beforeEach(function() {
      $cookies.put('favorites', JSON.stringify([]));
      
      testArrayOfFavorites = [{
        isbn: '1234561234789',
        listName: 'e-book-finction',
      },
      {
        isbn: '1564561234789',
        listName: 'e-book-finction',
      },
      {
        isbn: '1564565674789',
        listName: 'e-book-finction',
      }];
    });
    
    it('puts an array of favorites to cookies', function() {
      CustomCookiesService.putFavoritesToCookies(testArrayOfFavorites);
    
      var favorites = JSON.parse($cookies.get('favorites'));
      
      expect(favorites).toEqual(testArrayOfFavorites); 
    });
    
    it('puts whole new array into cookies and replaces old', function() {
      CustomCookiesService.putFavoritesToCookies(testArrayOfFavorites);
    
      var favorites = JSON.parse($cookies.get('favorites'));
      
      favorites.splice(0,1);
      
      favorites.push({
        isbn: '9876543211234',
        listName: 'asdadasdadad'
      });
      
      CustomCookiesService.putFavoritesToCookies(favorites);
      
      var newFavorites = JSON.parse($cookies.get('favorites'));
      
      expect(newFavorites).toEqual(favorites);
    });
  });
  
  describe('#deleteAllFavoritesFromCookies', function() {
    var tempArrayOfFavorites;
    
    beforeEach(function() {
      tempArrayOfFavorites = {
        isbn: '9876543211234',
        listName: 'asdadasdadad'
      };
      
      $cookies.put('favorites', JSON.stringify(tempArrayOfFavorites));
    });
    
    it('deletes favorites from cookies', function() {
      CustomCookiesService.deleteAllFavoritesFromCookies();
      
      expect($cookies.get('favorites')).toBeUndefined();
    });
    
    it('does nothing if it is called more than once', function() {
      spyOn(CustomCookiesService, 'deleteAllFavoritesFromCookies');
      
      CustomCookiesService.deleteAllFavoritesFromCookies();
      CustomCookiesService.deleteAllFavoritesFromCookies();
      
      expect(CustomCookiesService.deleteAllFavoritesFromCookies.calls.count()).toEqual(2);
    });
    
  });
  
  describe('#getFavoritesFromCookies', function() {
    var tempArrayOfFavorites;
    
    beforeEach(function() {
      tempArrayOfFavorites = {
        isbn: '9876543211234',
        listName: 'asdadasdadad'
      };
      
      $cookies.put('favorites', JSON.stringify(tempArrayOfFavorites));
    });
    
    it('get favorites from cookies', function() {
      var favorites = CustomCookiesService.getFavoritesFromCookies();
      
      expect(favorites).toEqual(tempArrayOfFavorites);
    });
    
    it('if there are no favorites in cookies, function will return empty array', function() {
      $cookies.remove('favorites');
      
      var favorites = CustomCookiesService.getFavoritesFromCookies();
      
      expect(favorites).toEqual([]);
    });
  }); 
});