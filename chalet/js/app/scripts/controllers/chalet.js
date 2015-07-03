'use strict';

angular.module('jsApp')

  .controller('Chalet', ['$scope', 'RsResource', 'APP_PROPERTIES', function ($scope, RsResource, APP_PROPERTIES) {

    var getReqParams = function () {
      var reqParams = {};
      reqParams['host'] = APP_PROPERTIES.HOST;
      reqParams['context'] = APP_PROPERTIES.CONTEXT;
      reqParams['entityPath'] = 'chalets';
      return reqParams;
    }

    var reqParams = getReqParams();
    reqParams['startRow'] = 0;
    reqParams['pageSize'] = 0;
    RsResource.query(reqParams, function (model) {
      $scope.model = model;
    });

  }])


  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider.
      state('chalet', {
        url: '/chalet',
        controller: 'Chalet',
        templateUrl: 'views/chalet.html',
        ncyBreadcrumb: {
          label: 'chalet'
        }
      })

  }])

