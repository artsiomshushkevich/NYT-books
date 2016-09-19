angular
  .module('nytBooks')
  .factory('NamesService', NamesService);

function NamesService($resource, ConstantsService) {
  return $resource(ConstantsService.namesUrl, {
    version: ConstantsService.apiVersion,
    format: ConstantsService.responseFormat.json,
    'api-key': ConstantsService.apiKey
  }); 
}

NamesService.$inject = ['$resource', 'ConstantsService'];