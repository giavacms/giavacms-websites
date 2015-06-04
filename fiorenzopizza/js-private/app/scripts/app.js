'use strict';

/**
 * @ngdoc overview
 * @name giavacms-private
 * @description
 * # giavacms
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
        'textAngular',
        'ncy-angular-breadcrumb',
        'angularSpinner',
        'ui.ace'])

    .run(function ($state, $rootScope, $log) {
        $rootScope.$state = $state;
    })


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


    }])
;
