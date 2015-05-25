angular.module('giavacms-private')

    .factory('factoryItems',
    ['$rootScope', 'RsResource', '$q', 'APP_PROPERTIES',
        function ($rootScope, RsResource, $q, APP_PROPERTIES) {
            var service = {};
            //service.bannertypes;
            //service.richcontenttypes = {};

            var reqParams = {};
            reqParams['host'] = APP_PROPERTIES.HOST;
            reqParams['startRow'] = 0;
            reqParams['pageSize'] = 0;

            service.getBannertypes = function () {
                var d = $q.defer();
                if (angular.isUndefined(service.bannertypes)) {
                    reqParams['entityPath'] = 'bannertypes';
                    RsResource.query(reqParams, function (data) {
                        service.bannertypes = data;
                        d.resolve(service.bannertypes);
                    });
                } else {
                    d.resolve(service.bannertypes);
                }
                return d.promise;
            }

            service.getRichcontenttypes = function () {
                var d = $q.defer();
                if (angular.isUndefined(service.richcontenttypes)) {
                    reqParams['entityPath'] = 'richcontenttypes';
                    RsResource.query(reqParams, function (data) {
                        service.richcontenttypes = data;
                        d.resolve(service.richcontenttypes);
                    });
                } else {
                    d.resolve(service.richcontenttypes);
                }
                return d.promise;
            }

            $rootScope.$on('richcontenttypes', function () {
                service.richcontenttypes = undefined;
            });

            $rootScope.$on('bannertypes', function () {
                service.bannertypes = undefined;
            });


            return service;
        }
    ])
;
