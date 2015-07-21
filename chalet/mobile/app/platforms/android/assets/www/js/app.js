// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
    .module(
    'votalatuaestate',
    ['ionic', 'ionic-material', 'ionMdInput', 'ngResource',
        'LocalStorageModule', , 'angular-jwt'])

    .directive('imageonload', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element[0].style["visiblity"] = "hidden";
                element.bind('load', function () {
                    element[0].style["visibility"] = "visible";
                });
            }
        };
    })

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
            localStorageServiceProvider.setPrefix('chalet');
        }])

    .config(
    [
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider
                .imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file|data):/);
        }])

    .config(['$logProvider', function ($logProvider) {
        $logProvider.debugEnabled(true);
    }])

    .run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
        // Be sure to cleanup the modal by removing it from the DOM
        $rootScope.$on('$destroy', function () {
            $rootScope.loginModal.remove();
        })
    }])

    .run(
    [
        '$rootScope',
        'AuthenticationService',
        '$state',
        function ($rootScope, AuthenticationService, $state) {
            $rootScope.$on('$stateChangeStart',
                function (e, to) {
                    if (to.name == 'app.login'
                        || to.name == 'app.register') {
                        return;
                    }
                    AuthenticationService.isLogged().then(
                        function (tokenPayload) {
                            if (!tokenPayload) {
                                e.preventDefault();
                                $state.go('app.login');
                            }
                        })
                })
        }])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the
            // accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(
    function ($stateProvider, $urlRouterProvider,
              $ionicConfigProvider) {

        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

        /*
         * // Turn off back button text
         * $ionicConfigProvider.backButton.previousTitleText(false);
         */

        $stateProvider

            .state('app', {
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: '/',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })

            .state(
            'app.register',
            {
                url: '/register',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/register.html',
                        controller: 'RegisterCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })

            .state('app.chalet', {
                url: '/chalet',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/chalet.html',
                        controller: 'ChaletCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })

            .state(
            'app.chalet_single',
            {
                url: '/chalet/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/chalet_single.html',
                        controller: 'ChaletSingleCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })

            .state(
            'app.classifica',
            {
                url: '/classifica',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/classifica.html',
                        controller: 'ClassificaCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })
            /*
             * .state('app.contatti', { url: '/contatti', views: {
             * 'menuContent': { templateUrl: 'templates/contatti.html',
             * controller: 'ContattiCtrl' }, 'fabContent': { template: '<button
             * id="fab-contatti" class="button button-fab
             * button-fab-bottom-right button-energized-900"><i
             * class="icon ion-plus"></i></button>', controller:
             * function ($timeout) { $timeout(function () {
             * document.getElementById('fab-contatti').classList.toggle('on'); },
             * 800); } } } })
             *
             * .state('app.blog', { url: '/blog', views: {
             * 'menuContent': { templateUrl: 'templates/blog.html',
             * controller: 'BlogCtrl' }, 'fabContent': { template: '<button
             * id="fab-blog" class="button button-fab
             * button-fab-bottom-right button-energized-900"><i
             * class="icon ion-plus"></i></button>', controller:
             * function ($timeout) { $timeout(function () {
             * document.getElementById('fab-blog').classList.toggle('on'); },
             * 800); } } } })
             *
             */

        ;

        // if none of the above states are matched, use this as the
        // fallback
        $urlRouterProvider.otherwise('/');
    });
