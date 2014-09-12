'use strict';

angular.module('erg.server', [])
  .value('API_BASE_URL', 'http://localhost:3001')
  .factory('server', function($http, API_BASE_URL) {
    var service = {};

    service.get = function (path) {
      return $http.get(API_BASE_URL + path)
        .then(function(response) {
          return response.data;
        });
    };

    return service;
  });