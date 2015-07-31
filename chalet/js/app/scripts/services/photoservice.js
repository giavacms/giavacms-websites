'use strict';


angular.module('jsApp')

    .service('PhotoService', ['RsResource', 'APP_PROPERTIES', '$q', function (RsResource, APP_PROPERTIES, $q) {

        var host = APP_PROPERTIES.HOST;

        var list = [];
        var size = 0;
        var entityPath = 'photos';

        var getList = function (search, startRow, pageSize, orderBy) {
            var reqParams = {};
            reqParams['host'] = host;
            reqParams['entityPath'] = entityPath;
            reqParams['startRow'] = startRow;
            reqParams['pageSize'] = pageSize;
            if (orderBy) {
                reqParams['orderBy'] = orderBy;
            }
            angular.forEach(search, function (value, key) {
                reqParams[key] = value;
            });
            return RsResource.query(reqParams, function (data, headers) {
                list = data;
                size = headers('listSize');
                return data;
            }).$promise;
        }

        var getElement = function (id) {
            var reqParams = {};
            reqParams['host'] = host;
            reqParams['entityPath'] = entityPath;
            reqParams['id'] = id;
            return RsResource.get(reqParams, function (data) {
                return data;
            }).$promise;
        }

        var save = function (toTransfer) {
            var reqParams = {};
            reqParams['host'] = host;
            reqParams['entityPath'] = entityPath;
            return RsResource.create(reqParams, toTransfer, function (data) {
                return data;
            }).$promise;
        }


        var remove = function (toRemove, id) {
            var reqParams = {};
            reqParams['host'] = host;
            reqParams['entityPath'] = entityPath;
            if (id) {
                reqParams['id'] = id;
            }
            return RsResource.delete(reqParams, toRemove, function (data) {
                return data;
            }).$promise;
        }

        var getSize = function () {
            return size;
        }

        return {
            getList: getList,
            getSize: getSize,
            getElement: getElement,
            save: save,
            delete: remove
        };

    }]);
