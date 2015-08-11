'use strict';

angular.module('jsApp')
    .service('ChaletService', ['RsResource', 'APP_PROPERTIES', '$q', '$filter', 'StorageService',
        function (RsResource, APP_PROPERTIES, $q, $filter, StorageService) {

            var model = [];
            var element = {};

            var ramdom = function () {
                return (Math.round(Math.random()) - 0.5);
            }

            var getRandom = function (to) {
                if (angular.isUndefined(model) || model.length == 0) {
                    model = init(model);
                }

                if (angular.isUndefined(to) || to < 1 || to > getListSize(model))
                    to = 10;
                return $q.when(model).then(function (data) {
                    var slice = data;
                    slice.sort(ramdom);
                    slice = slice.slice(0, to);
                    return slice;
                });
            }

            var getReqParams = function () {
                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['context'] = APP_PROPERTIES.CONTEXT;
                reqParams['entityPath'] = 'chalets';
                reqParams['startRow'] = 0;
                reqParams['pageSize'] = 0;
                return reqParams;
            }

            var getListSize = function () {
                if (angular.isUndefined(model) || model.length == 0) {
                    model = init(model);
                }
                return $q.when(model).then(function (data) {
                    return data.length;
                });
            }

            var getList = function (search, from, to) {
                if (angular.isUndefined(model) || model.length == 0) {
                    model = init(model);
                }
                if (angular.isUndefined(from) || Number(from) < 0)
                    from = 0;
                if (angular.isUndefined(to) || to < 1 || to > getListSize(model))
                    to = 10;
                return $q.when(model).then(function (data) {
                    var slice = data.slice(from, to);
                    slice = $filter('orderBy')(slice, 'name');
                    return $q.when(slice);
                });
            }

            var getElement = function (id) {
                if (angular.isUndefined(model) || model.length == 0) {
                    model = init(model);
                }
                return $q.when(model).then(function (data) {
                    for (var i = 0; i < data.length; ++i) {
                        if (data[i].id == id) {
                            element = data[i];
                        }
                    }
                    return $q.when(element);
                });
            }

            var getElementByLicenseNumber = function (licenseNumber) {
                if (angular.isUndefined(model) || model.length == 0) {
                    model = init(model);
                }
                return $q.when(model).then(function (data) {
                    for (var i = 0; i < data.length; ++i) {
                        if (data[i].licenseNumber == licenseNumber) {
                            element = data[i];
                        }
                    }
                    return $q.when(element);
                });
            }


            var init = function (model) {
                return StorageService.get('chalets').then(function (data) {
                    if (data && data.length > 0) {
                        model = $filter('orderBy')(data, 'name');
                        return $q.when(model);
                    } else {
                        var reqParams = getReqParams();
                        reqParams['id'] = 'all';
                        var list = RsResource.query(reqParams, function (data) {
                            StorageService.set('chalets', data);
                            model = $filter('orderBy')(data, 'name');
                        }).$promise;
                        return list;
                    }
                });
            }


            return {
                getListSize: getListSize,
                getList: getList,
                getElement: getElement,
                getRandom: getRandom,
                getElementByLicenseNumber: getElementByLicenseNumber
            };
        }])
;
