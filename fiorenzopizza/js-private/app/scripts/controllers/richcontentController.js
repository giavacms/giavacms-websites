'use strict';


angular.module('giavacms-private')

  .controller('RichcontentController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location', 'APP_PROPERTIES',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location, APP_PROPERTIES) {
      angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

      $scope.listPage = 'richcontent';
      $scope.newPage = 'richcontent_new';
      $scope.entityType = 'richcontent';
      $scope.sortingArray = {data: 'desc'};

      $scope.getBaseSearch = function (search, reqParams) {
        if (search && search.like && search.like.title) {
          console.log('title: ' + search.like.title);
          reqParams['like.title'] = search.like.title;
        }
        if (search && search.obj && search.obj.richContentType && search.obj.richContentType.id) {
          console.log('id: ' + search.obj.richContentType.id);
          reqParams['obj.richContentType.id'] = search.obj.richContentType.id;
        }
        reqParams['obj.language'] = 'ITA';
      };

      //inizializzo la lista dei richcontenttype
      if (angular.isUndefined($scope.richcontenttypes)) {
        var reqParams = {};
        reqParams['host'] = APP_PROPERTIES.HOST;
        reqParams['startRow'] = 0;
        reqParams['pageSize'] = 0;
        reqParams['entityType'] = 'richcontenttype';
        RsResource.query(reqParams, function (data) {
          $scope.richcontenttypes = data;
        });
      }


      // anche dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
      // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
      // ...e quindi...
      // funzione di callback. altre idee?
      $scope.getSuccess = function () {

        console.log('element: ' + $scope.element);
      };

      $scope.getFailure = function () {

        $scope.sectionPath = ['news'];
      };
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('richcontent', {
        url: '/richcontent',
        templateUrl: 'views/richcontent/list.html',
        ncyBreadcrumb: {
          label: 'Richcontent',
          parent: 'home'
        }
      })
      .state('richcontent_new', {
        url: '/richcontent/new',
        templateUrl: 'views/richcontent/edit.html',
        ncyBreadcrumb: {
          label: 'new',
          parent: 'richcontent'
        }
      })
      .state('richcontent_edit', {
        url: '/richcontent/:id/edit',
        templateUrl: 'views/richcontent/edit.html',
        ncyBreadcrumb: {
          label: 'edit',
          parent: 'richcontent'
        }
      })

      .state('richcontent_view', {
        url: '/richcontent/:id',
        templateUrl: 'views/richcontent/view.html',
        ncyBreadcrumb: {
          label: 'detail',
          parent: 'richcontent'
        }
      })

  }])

;
