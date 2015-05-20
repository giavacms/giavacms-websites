'use strict';

angular.module('giavacms-private')

  .service('PropertiesService', ['$scope', 'RsResource', 'APP_PROPERTIES', function ($scope, RsResource, APP_PROPERTIES) {

    var reqParams = {};
    reqParams['host'] = APP_PROPERTIES.HOST;
    reqParams['startRow'] = 0;
    reqParams['pageSize'] = 0;


    if (angular.isUndefined($scope.bannertypologies)) {
      reqParams['entityType'] = 'bannertypology';
      RsResource.query(reqParams, function (data) {
        $scope.bannertypologies = data;
      });
    }


    if (angular.isUndefined($scope.richcontenttypes)) {
      reqParams['entityType'] = 'richcontenttype';
      RsResource.query(reqParams, function (data) {
        $scope.richcontenttypes = data;
      });
    }

  }]);
