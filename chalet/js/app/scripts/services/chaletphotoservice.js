'use strict';


angular.module('jsApp')

  .service('ChaletPhotoService', ['RsResource', 'APP_PROPERTIES', '$q', function (RsResource, APP_PROPERTIES, $q) {

    var host = APP_PROPERTIES.HOST;

    var list = [];
    var size = 0;
    var entityPath = 'chalets';
    var entityPath2 = 'photos';
    var chaletId;

    var getList = function (search, startRow, pageSize, orderBy) {
      var reqParams = {};
      reqParams['host'] = host;
      reqParams['entityPath'] = entityPath;
      reqParams['id'] = chaletId;
      reqParams['entityPath2'] = entityPath2;
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

    var getSize = function () {
      return size;
    }

    return {
      getList: getList,
      getSize: getSize,
      setChaletId: function(id) { chaletId = id; }
    };

  }]);
