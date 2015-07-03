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
                init();
            }
            if (angular.isUndefined(model)) {
                if (angular.isUndefined(from) || Number(from) < 0)
                    from = 0;
                if (angular.isUndefined(to) || Number(to) > model.length)
                    to = 10;

                return model.slice(from, to);
            }

            return model;
        }

        var getElement = function (id) {
            if (angular.isUndefined(model) || model.length == 0) {
                init();
            }
            model.forEach()
            return element;
        }


        var init = function () {
            RsResource.query(reqParams, function (model) {
                $scope.model = model;
            });
        }

        return {
            getList: getList,
            getElement: getElement
        };


    }]);