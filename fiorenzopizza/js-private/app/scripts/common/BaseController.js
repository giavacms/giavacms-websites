'use strict';

function BaseController($scope, $stateParams, $state, Service, popupService, NgTableParams, $location, APP_PROPERTIES, controller) {

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
      reqParams['entityType'] = $scope.entityType;
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
      (angular.isDefined($location)) ?
        $location.search() : {}),
    {
      getData: function ($defer, params) {
        var reqParams = {};
        reqParams['host'] = host;
        reqParams['context'] = context;
        reqParams['entityType'] = $scope.entityType;
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

  $scope.addNew = function () {
    $scope.element = {};
    $state.go($scope.newPage);
  }


  $scope.save = function () {
    var reqParams = {};
    reqParams['host'] = host;
    reqParams['context'] = context;
    reqParams['entityType'] = $scope.entityType;
    Service.create(reqParams, $scope.element, function () {
      $scope.element = {};
      $state.go($scope.listPage);
    });

  }

  $scope.update = function () {
    var reqParams = {};
    reqParams['host'] = host;
    reqParams['context'] = context;
    reqParams['entityType'] = $scope.entityType;
    Service.update(reqParams, $scope.element, function () {
      $state.go($scope.listPage);
    });
  }

  $scope.updateInLine = function (inLine) {
    var reqParams = {};
    reqParams['host'] = host;
    reqParams['context'] = context;
    reqParams['entityType'] = $scope.entityType;
    Service.update(reqParams, inLine, function () {
      $scope.tableParams.reload();
    });
  }

  $scope.delete = function () {
    if (popupService.showPopup('Vuoi eliminarlo?')) {
      var reqParams = {};
      reqParams['host'] = host;
      reqParams['context'] = context;
      reqParams['entityType'] = $scope.entityType;
      Service.delete(reqParams, $scope.element, function () {
        $state.go($scope.listPage);
      });
    }
  }

  $scope.deleteInLine = function (inLine) {
    if (popupService.showPopup('Vuoi eliminarlo?')) {
      var reqParams = {};
      reqParams['host'] = host;
      reqParams['context'] = context;
      reqParams['entityType'] = $scope.entityType;
      Service.delete(reqParams, inLine, function () {
        $scope.tableParams.reload();
      });
    }
  }

  $scope.undo = function () {
    $scope.element = {};
    $scope.search = {};
    $state.go($scope.listPage);
  }


  $scope.reset = function () {
    $scope.element = {};
    $scope.search = {};
    $scope.tableParams.reload();
  }


  $scope.setEditId = function (pid) {
    $scope.editId = pid;
    $scope.tableParams.reload();
  }

}
