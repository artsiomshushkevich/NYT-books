angular
  .module('nytBooks')
  .factory('ConstantsService', ConstantsService);

function ConstantsService() {
  return {
    baseUrl: 'https://api.nytimes.com/svc/books/:version/lists.:format',
    namesUrl: "https://api.nytimes.com/svc/books/:version/lists/names.:format",
    apiKey: '3a1e141439d84f62ad4440e6a2d96e77',
    apiVersion: 'v3',
    responseFormat: {
      json: 'json',
      jsonp: 'jsonp'
    },
    defaultList: 'hardcover-fiction'
  }
}