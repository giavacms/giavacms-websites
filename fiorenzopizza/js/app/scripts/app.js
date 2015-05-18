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
  .module('fiorenzopizza', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngTable'
  ])

  .constant("APP_PROPERTIES", {
    "HOST": "localhost:8080",
    "CONTEXT": "",
    "PAGE": 1,
    "COUNT": 5
  })

  .filter('newlines', function () {
    return function (text) {
      if (text)
        return text.replace(/\n/g, '<br/>');
      return '';
    }
  })

  .filter('htmlToPlaintext', function () {
    return function (text) {
      return String(text).replace(/<[^>]+>/gm, '');
    }
  })

  .run(function ($state, $rootScope, $log) {
    $rootScope.$state = $state;
  })


  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');


    $stateProvider

      .state('home', {
        url: '/',
        views: {
          'content': {
            templateUrl: 'views/home.html'
          }
        }
      })

      .state('about', {
        url: '/about',
        views: {
          'content': {
            templateUrl: 'views/about.html'
          }
        }
      })

      .state('projects', {
        url: '/projects',
        views: {
          'content': {
            templateUrl: 'views/projects.html'
          }
        }
      })

  }])
;

