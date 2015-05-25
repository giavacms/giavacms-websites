'use strict';

angular.module('fiorenzopizza')

  .controller('BannerController', ['$scope', 'RsResource', function ($scope, RsResource) {

    var host = 'localhost:8080';

    $scope.banners = {};
    var reqParams = {};
    reqParams['host'] = 'localhost:8080';
    reqParams['entityPath'] = 'banners';
    reqParams['startRow'] = 0;
    reqParams['pageSize'] = 3;


    var reqParams = {};
    reqParams['host'] = host;
    reqParams['entityPath'] = 'banners';
    reqParams['startRow'] = 0;
    reqParams['pageSize'] = 3;
    RsResource.query(reqParams, function (data) {
      $scope.banners = data;
    });

  }]);
