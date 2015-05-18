'use strict';


angular.module('giavacms-private')

  .factory('RsResource', function ($resource) {

    return $resource('http://:host/api/v1/:entityType/:id', {
      host: '@host',
      entityType: '@entityType',
      id: '@id'
    }, {
      query: {method: 'GET', isArray: true},
      create: {method: 'POST'},
      show: {method: 'GET'},
      update: {method: 'PUT', params: {id: '@id'}},
      delete: {method: 'DELETE', params: {id: '@id'}}
    })
  });
