'use strict';

/**
 * @ngdoc overview
 * @name jsPrivateApp
 * @description
 * # jsPrivateApp
 *
 * Main module of the application.
 */
angular
  .module('giavacms-private', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'ngTable',
    'textAngular'
  ])
  .constant("APP_PROPERTIES", {
    "HOST": "localhost:8080",
    "CONTEXT": "",
    "PAGE": 1,
    "COUNT": 5
  })
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }])

  .service('popupService', function ($window) {
    this.showPopup = function (message) {
      return $window.confirm(message);
    }
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


  }])
;
