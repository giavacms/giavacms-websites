'use strict';


angular.module('giavacms-private')

  .controller('RichcontentTypeController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location', 'APP_PROPERTIES',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location, APP_PROPERTIES) {
      angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

      $scope.listPage = 'richcontenttype';
      $scope.newPage = 'richcontenttype';
      $scope.entityType = 'richcontenttype';
      $scope.sortingArray = {data: 'desc'};

      $scope.getBaseSearch = function (search, reqParams) {
        if (search && search.obj && search.obj.name) {
          console.log('name: ' + search.obj.name);
          reqParams['obj.name'] = search.obj.name;
        }
        reqParams['obj.language'] = 'ITA';
      };


      // anche dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
      // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
      // ...e quindi...
      // funzione di callback. altre idee?
      $scope.getSuccess = function () {

        console.log('element: ' + $scope.element);
      };

      $scope.getFailure = function () {

      };
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('richcontenttype', {
        url: '/richcontenttype',
        templateUrl: 'views/richcontenttype/list.html',
        ncyBreadcrumb: {
          label: 'Richcontenttype',
          parent: 'home'
        }
      })

      .state('richcontenttype_edit', {
        url: '/richcontenttype/:id/edit',
        templateUrl: 'views/richcontenttype/list.html',
        ncyBreadcrumb: {
          label: 'Richcontenttype',
          parent: 'home'
        }
      })

  }])

;
