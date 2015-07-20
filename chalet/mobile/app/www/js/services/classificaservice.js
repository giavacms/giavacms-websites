'use strict';


angular.module('votalatuaestate')

    .service('ClassificaService', ['RsResource', 'APP_PROPERTIES', '$q', 'AuthenticationService',
        function (RsResource, APP_PROPERTIES, $q, AuthenticationService) {

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
                if (angular.isUndefined(model) || model.length == 0) {
                    model = init(model);
                }
                $q.when(model).then(function (data) {
                    if (data && data.length > 0) {
                        callback(data[0]);
                    }
                });
            }

            var vota = function (licenseNumber) {
                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = "contest";
                reqParams['id'] = "withToken";

                var vote = {
                    phone: AuthenticationService.getUsername(),
                    name: AuthenticationService.getFullname(),
                    surname: '',
                    preference1: licenseNumber
                };

                var result = RsResource.create(reqParams, vote, function (success) {
                    console.log(vote);
                }, function (error) {
                    console.log(error);
                }).$promise;
                return result;
            }

            var init = function (model) {
                var list = RsResource.query(getReqParams(), function (data) {
                    model = data;
                }).$promise;
                return list;
            }

            return {
                getLast: getLast,
                vota: vota
            };


        }
    ])
;
