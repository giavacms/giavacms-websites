'use strict';


angular.module('jsApp')

  .service('ChaletService', ['RsResource', 'APP_PROPERTIES', '$q', function (RsResource, APP_PROPERTIES, $q) {

    var model = [];
    var element = {};


    var getReqParams = function () {
      var reqParams = {};
      reqParams['host'] = APP_PROPERTIES.HOST;
      reqParams['context'] = APP_PROPERTIES.CONTEXT;
      reqParams['entityPath'] = 'chalets';
      reqParams['startRow'] = 0;
      reqParams['pageSize'] = 0;
      return reqParams;
    }


    var getList = function (search, from, to, callback) {
      if (angular.isUndefined(model) || model.length == 0) {
        model = init(model);
      }
      if (angular.isUndefined(from) || Number(from) < 0)
        from = 0;
      if (angular.isUndefined(to))
        to = 10;
      $q.when(model).then(function (data) {
        callback(data.slice(from, to));
      });
    }

    var getElement = function (id, callback) {
      if (angular.isUndefined(model) || model.length == 0) {
        model = init(model);
      }
      $q.when(model).then(function (data) {
        for (var i = 0; i < data.length; ++i) {
          if (data[i].id == id) {
            element = data[i];
          }
        }
        if (element) {
          callback(element);
        }
        else {
          console.error(id + '  not found');
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
      getList: getList,
      getElement: getElement
    };


  }
  ])
;
