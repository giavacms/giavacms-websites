'use strict';


angular.module('jsApp')

    .service('ChaletService', ['RsResource', 'APP_PROPERTIES', function (RsResource, APP_PROPERTIES) {


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


        var getList = function (search, from, to) {
            if (angular.isUndefined(model) || model.length == 0) {
                model = init(model);
            }
            if (angular.isUndefined(from) || Number(from) < 0)
                from = 0;
            if (angular.isUndefined(to))
                to = 10;
            $q.when(model).then(function () {
                return model.slice(from, to);
            });
        }

        var getElement = function (id) {
            if (angular.isUndefined(model) || model.length == 0) {
                init(model);
            }
            $q.when(model).then(function () {
                for (i = 0; i < model.length; ++i) {
                    if (model[i].id = id) {
                        element = model[i];
                    }
                }
                return element;
            });
        }


        var init = function (model) {
            var list = RsResource.query(reqParams, function (data) {
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