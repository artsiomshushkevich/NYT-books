describe("BooksController", function() {
  var $httpBackend, namesRequestHandler, booksRequestHundler,
      createController, $scope, BooksService, NamesService, 
      ConstantsService, ProgressBarService, CustomCookiesService, $location;
 
  beforeEach(function() {
    module('nytBooks');
    
    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      
      var $controller = $injector.get('$controller');
      
      $scope = {};
      BooksService = $injector.get('BooksService');
      NamesService = $injector.get('NamesService');
      ConstantsService = $injector.get('ConstantsService');
      ProgressBarService = $injector.get('ProgressBarService');
      CustomCookiesService = $injector.get('CustomCookiesService');
      $location = $injector.get('$location');
      
      
      createController  = function() {
        return $controller('BooksController', {
          $scope: $scope,
          BooksService: BooksService,
          NamesService: NamesService,
          ConstatnsService: ConstantsService,
          ProgressBarService: ProgressBarService,
          CustomCookiesService: CustomCookiesService,
          $location: $location
        });
      }
     
      
      namesRequestHandler = $httpBackend
        .when('GET', 
              'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=3a1e141439d84f62ad4440e6a2d96e77')
        .respond(200, {results: []});
      
      booksRequestHundler = $httpBackend
        .when('GET',
             'https://api.nytimes.com/svc/books/v3/lists.json?api-key=3a1e141439d84f62ad4440e6a2d96e77&list=hardcover-fiction')
        .respond(200, {results: []});
    });
  });
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  it('should make requset for books names', function() {
    $httpBackend.expectGET('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=3a1e141439d84f62ad4440e6a2d96e77');
    
    var controller = createController();
    
    $httpBackend.flush();
  });
  
  it('should make request for books', function() {
    $httpBackend.expectGET('https://api.nytimes.com/svc/books/v3/lists.json?api-key=3a1e141439d84f62ad4440e6a2d96e77&list=hardcover-fiction');
    
    var controller = createController();
    
    $httpBackend.flush();
  });
  
  it('should set books, names, amountOfFavorites and currentList in controllers $scope', function() {
    var controller = createController();
    
    expect($scope.currentList).toEqual('hardcover-fiction');
    expect($scope.amountOfFavorites).not.toBeUndefined();
    
    $httpBackend.flush();
    
    expect($scope.books).not.toBeUndefined();
    expect($scope.names).not.toBeUndefined();
  });
  
  
  describe("Should use ProgressBarService", function() {
    beforeEach(function() {
      $scope = {};
    });
    
    it('should invoke method start before downloading resources', function() {
      spyOn(ProgressBarService, 'start');
      
      var controller = createController();
      
      $httpBackend.flush();
      
      expect(ProgressBarService.start).toHaveBeenCalled();
    })
    
    it('should invoke method complete after downloading resources', function(){
      spyOn(ProgressBarService, 'complete');
      
      var controller = createController();
      
      $httpBackend.flush();
      
      expect(ProgressBarService.complete).toHaveBeenCalled();
    });
  });
});
















