(function() {
  angular
    .module('nytBooks')
    .factory('ProgressBarService', ProgressBarService);
  
  ProgressBarService.$inject = ['ngProgressFactory'];
  
  function ProgressBarService(ngProgressFactory) {
    var progressBar = ngProgressFactory.createInstance();
    
    progressBar.setHeight('7px');
    progressBar.setColor('#ecf0f1');
    
    return {
      start: function() {
        progressBar.start();
      },
      complete: function() {
        progressBar.complete();
      }
    }
  }
})();
