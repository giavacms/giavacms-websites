angular.module('giavacms-private')

    .factory('factoryItems',
    ['$rootScope', 'RsResource', '$q', 'APP_PROPERTIES',
        function ($rootScope, RsResource, $q, APP_PROPERTIES) {
            var service = {};
            //service.bannertypologies;
            //service.richcontenttypes = {};

            var reqParams = {};
            reqParams['host'] = APP_PROPERTIES.HOST;
            reqParams['startRow'] = 0;
            reqParams['pageSize'] = 0;

            service.getBannertypologies = function () {
                var d = $q.defer();
                if (angular.isUndefined(service.bannertypologies)) {
                    reqParams['entityType'] = 'bannertypology';
                    RsResource.query(reqParams, function (data) {
                        service.bannertypologies = data;
                        d.resolve(service.bannertypologies);
                    });
                } else {
                    d.resolve(service.bannertypologies);
                }
                return d.promise;
            }

            service.getRichcontenttypes = function () {
                var d = $q.defer();
                if (angular.isUndefined(service.richcontenttypes)) {
                    reqParams['entityType'] = 'richcontenttype';
                    RsResource.query(reqParams, function (data) {
                        service.richcontenttypes = data;
                        d.resolve(service.richcontenttypes);
                    });
                } else {
                    d.resolve(service.richcontenttypes);
                }
                return d.promise;
            }

            $rootScope.$on('richcontenttype', function () {
                service.richcontenttypes = undefined;
            });

            $rootScope.$on('bannertypology', function () {
                service.bannertypologies = undefined;
            });


            return service;
        }
    ])
;
