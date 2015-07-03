'use strict';

/**
 * @ngdoc overview
 * @name jsApp
 * @description
 * # jsApp
 *
 * Main module of the application.
 */
angular
  .module('jsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngTouch'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        ncyBreadcrumb: {
          label: 'Home page'
        }
      })


      .state('chalet_single', {
        url: '/chalet/:id',
        templateUrl: 'views/chalet_single.html',
        ncyBreadcrumb: {
          label: 'chalet single'
        }
      })


      .state('classifica', {
        url: '/classifica',
        templateUrl: 'views/classifica.html',
        ncyBreadcrumb: {
          label: 'classifica'
        }
      })


  }])
;

