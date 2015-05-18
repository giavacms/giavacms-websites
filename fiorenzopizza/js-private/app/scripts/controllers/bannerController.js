'use strict';


angular.module('giavacms-private')

  .controller('BannerController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location', 'APP_PROPERTIES',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location, APP_PROPERTIES) {
      angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

      $scope.listPage = 'banner';
      $scope.newPage = 'banner_new';
      $scope.entityType = 'banner';
      $scope.sortingArray = {id: 'desc'};

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
      .state('banner', {
        url: '/banner',
        views: {
          'content@': {
            templateUrl: 'views/banner/list.html',
            controller: 'BannerController'
          }
        }
      })
      .state('banner_new', {
        url: '/banner/new',
        views: {
          'content@': {
            controller: 'BannerController',
            templateUrl: 'views/banner/edit.html'
          }
        }
      })
      .state('banner_edit', {
        url: '/banner/:id/edit',
        views: {
          'content@': {
            controller: 'BannerController',
            templateUrl: 'views/banner/edit.html'
          }
        }
      })

      .state('banner_view', {
        url: '/banner/:id',
        views: {
          'content@': {
            controller: 'BannerController',
            templateUrl: 'views/banner/view.html'
          }
        }
      })

  }])

;
