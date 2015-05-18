'use strict';


angular.module('giavacms-private')

  .controller('NewsController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location', 'APP_PROPERTIES',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location, APP_PROPERTIES) {
      angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

      $scope.listPage = 'news';
      $scope.newPage = 'news_new';
      $scope.entityType = 'richcontent';
      $scope.sortingArray = {data: 'desc'};

      $scope.getBaseSearch = function (search, reqParams) {
        if (search && search.obj && search.obj.title) {
          console.log('title: ' + search.obj.title);
          reqParams['obj.title'] = search.obj.title;
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

        $scope.sectionPath = ['news'];
      };
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('news', {
        url: '/news',
        views: {
          'content@': {
            templateUrl: 'views/news/list.html',
            controller: 'NewsController'
          }
        }
      })
      .state('news_new', {
        url: '/news/new',
        views: {
          'content@': {
            controller: 'NewsController',
            templateUrl: 'views/news/edit.html'
          }
        }
      })
      .state('news_edit', {
        url: '/news/:id/edit',
        views: {
          'content@': {
            controller: 'NewsController',
            templateUrl: 'views/news/edit.html'
          }
        }
      })

      .state('news_view', {
        url: '/news/:id',
        views: {
          'content@': {
            controller: 'NewsController',
            templateUrl: 'views/news/view.html'
          }
        }
      })

  }])

;
