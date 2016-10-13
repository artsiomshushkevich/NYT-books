/*
  Test cases for modal directive won't work because  modal window template
  is placed in /public directory. It's used by minified js which is placed
  in the same directory but karma uses not minified js which is placed in 
  /src directory so not minified js can't resolve path for directive's template.
  Code below shows how should test for directive look like.
*/
describe('modalWindowDirective', function() {
  var $rootScope, $compile;
  
  beforeEach(function() {
    module('nytBooks');
    
    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
    });
  });
  
  it('replaces directive with appropriate content', function() {
    var modalWindow = $compile('<modal-window-directive></modal-window-directive>')($rootScope);
    
    $rootScope.$digest();
    
    expect(modalWindow.html()).toContain("Published");
  });
});