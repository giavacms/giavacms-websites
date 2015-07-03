'use strict';


angular.module('jsApp')

  .service('ClassificaService', ['RsResource', 'APP_PROPERTIES', '$q', function (RsResource, APP_PROPERTIES, $q) {

    var model = [];
    var element = {};


    var getReqParams = function () {
      var reqParams = {};
      reqParams['host'] = APP_PROPERTIES.HOST;
      reqParams['context'] = APP_PROPERTIES.CONTEXT;
      reqParams['entityPath'] = 'parades';
      reqParams['startRow'] = 0;
      reqParams['pageSize'] = 1;
      return reqParams;
    }


    var getLast = function (callback) {
      $q.when(model).then(function (data) {
        if (data && data.length > 0) {
          callback(data[0]);
        }
      });
    }

    var init = function (model) {
      var list = RsResource.query(getReqParams(), function (data) {
        model = data;
      }).$promise;
      return list;
    }

    return {
      getLast: getLast
    };


  }
  ])
;
