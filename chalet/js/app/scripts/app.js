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
    'ngTouch',
    'LocalStorageModule',
    'angular-jwt'
  ])

  .run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
    $rootScope
      .$on('$stateChangeSuccess',
      function (event) {

        if (!$window.ga)
          return;

        $window.ga('send', 'pageview', {page: $location.path()});
      });
  }])

  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }]
)

  .filter('range', function () {
    return function (input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++)
        input.push(i);
      return input;
    }
  })

  .config(
  ['localStorageServiceProvider',
    function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('votalatuaestate');
    }])


  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

  }])


  .config(['jwtInterceptorProvider', '$httpProvider', function (jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = function (StorageService) {
      return StorageService.get('token');
      //return "nn" ;
    }

    $httpProvider.interceptors.push('jwtInterceptor');
  }])


