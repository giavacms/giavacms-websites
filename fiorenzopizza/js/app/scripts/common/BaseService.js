'use strict';


angular.module('fiorenzopizza')

  .factory('RsResource', function ($resource) {

    return $resource('http://:host/api/v1/:entityPath/:id', {
      host: '@host',
      entityPath: '@entityPath',
      id: '@id'
    }, {
      query: {method: 'GET', isArray: true},
      create: {method: 'POST'},
      show: {method: 'GET'},
      update: {method: 'PUT', params: {id: '@id'}},
      delete: {method: 'DELETE', params: {id: '@id'}}
    })
  });
