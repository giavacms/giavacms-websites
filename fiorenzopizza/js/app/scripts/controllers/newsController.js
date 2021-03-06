'use strict';

angular.module('fiorenzopizza')

  .controller('NewsController', ['$scope', '$stateParams', '$state', 'RsResource', 'NgTableParams', '$filter', '$location', 'APP_PROPERTIES',
    function ($scope, $stateParams, $state, RsResource, NgTableParams, $filter, $location, APP_PROPERTIES) {
      angular.extend(this, new ViewController($scope, $stateParams, $state, RsResource, NgTableParams, $filter, $location, APP_PROPERTIES));
      $scope.listPage = 'news';
      $scope.entityPath = 'richcontent';
      $scope.sortingArray = {data: 'desc'};

      $scope.getBaseSearch = function (search, reqParams) {
        if (search && search.obj && search.obj.title) {
          console.log('title: ' + search.obj.title);
          reqParams['obj.title'] = search.obj.title;
        }
        reqParams['obj.language'] = 'ITA';
      };

      $scope.getSuccess = function () {
        $scope.sectionTitle = $scope.element.oggetto;
        $scope.sectionSubtitle = $filter('date')($scope.element.data*1000, 'dd/MM/yyyy');
        $scope.sectionPath = ['news', $scope.element.id];
        console.log('element: ' + $scope.element);
      };

      $scope.getFailure = function () {
        $scope.sectionTitle = 'Errori nel caricamento dei dati';
        $scope.sectionSubtitle = $filter('date')(new Date(), 'dd/MM/yyyy');
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
            templateUrl: 'views/news.html',
            controller: 'NewsController'
          }
        }
      })

      .state('news_view', {
        url: '/:id',
        views: {
          'content@': {
            controller: 'NewsController',
            templateUrl: 'views/single-news.html'
          }
        }
      })
  }])

;
