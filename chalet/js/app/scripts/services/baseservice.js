'use strict';


angular.module('jsApp')

    .factory('RsResource', function ($resource) {

        return $resource('http://:host/api/v1/:entityPath/:id/:entityPath2/:id2', {
            host: '@host',
            entityPath: '@entityPath',
            id: '@id',
            entityPath2: '@entityPath2',
            id2: '@id2'
        }, {
            query: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            show: {method: 'GET'},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        })
    });
