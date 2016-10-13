angular
  .module('nytBooks')
  .factory('BooksService', BooksService);

function BooksService($resource, ConstantsService) {
  return $resource(ConstantsService.baseUrl, {
    version: ConstantsService.apiVersion,
    format: ConstantsService.responseFormat.json,
    'api-key': ConstantsService.apiKey
  }); 
}

BooksService.$inject = ['$resource', 'ConstantsService'];