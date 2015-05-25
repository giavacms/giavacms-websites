'use strict';

function ViewController($scope, $stateParams, $state, Service, NgTableParams, $filter, $location, APP_PROPERTIES) {

  var host = APP_PROPERTIES.HOST;
  var context = APP_PROPERTIES.CONTEXT;
  var page = APP_PROPERTIES.PAGE;
  var count = APP_PROPERTIES.COUNT;

  var editId = -1;

  $scope.init = function () {
    if ($stateParams.id !== undefined) {
      var reqParams = {};
      reqParams['host'] = host;
      reqParams['context'] = context;
      reqParams['entityPath'] = $scope.entityPath;
      reqParams['id'] = $stateParams.id;
      $scope.element = Service.get(reqParams, $scope.getSuccess, $scope.getFailure);
    } else {
      $scope.element = {};
    }
  }

  $scope.getSuccess = function () {
  }
  $scope.getFailure = function () {
  }

  $scope.getBaseSearch = function (search, reqParams) {
  }

  $scope.tableParams = new NgTableParams(
    angular.extend({
        page: page,            // show first page
        count: count           // count per page
        //,sorting: $scope.sortingArray //nome: 'desc' // initial sorting
      },
      (angular.isDefined($location)) ? $location.search() : {}),
    {
      getData: function ($defer, params) {
        var reqParams = {};
        reqParams['host'] = host;
        reqParams['context'] = context;
        reqParams['entityPath'] = $scope.entityPath;
        reqParams['startRow'] = (params.page() - 1) * params.count();
        reqParams['pageSize'] = params.count();
        if (angular.isDefined(params.$params['sorting'])) {
          angular.forEach(params.$params['sorting'], function (value, key) {
            reqParams['orderBy'] = key + ' ' + value;
          });
        }
        $scope.getBaseSearch($scope.search, reqParams);
        Service.query(reqParams, function (data, getResponseHeaders) {
          params.total(getResponseHeaders('listSize'));
          $defer.resolve(data);
        });
        if (angular.isDefined($location)) {
          $location.search(params.url()); // put params in url
        }
      }
    })
  ;

  $scope.reload = function () {
    $scope.tableParams.reload();
  }

  $scope.resetSearch = function () {
    $scope.search = {};
    $scope.tableParams.reload();
  }


}
