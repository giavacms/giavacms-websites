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
    .module('jsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ngTouch'])

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

            .state('artisti', {
                url: '/artisti',
                templateUrl: 'views/artisti.html',
                ncyBreadcrumb: {
                    label: 'artisti'
                }
            })

            .state('blog', {
                url: '/blog',
                templateUrl: 'views/blog.html',
                ncyBreadcrumb: {
                    label: 'blog'
                }
            })


    }])
;
