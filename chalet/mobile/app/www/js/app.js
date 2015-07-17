// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('votalatuaestate', 
		['ionic', 
		 'ionic-material', 
		 'ionMdInput',
         'ngResource',
		 ])

		 
    .filter('range', function () {
        return function (input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++)
                input.push(i);
            return input;
        }
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
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

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

        /*
         // Turn off back button text
         $ionicConfigProvider.backButton.previousTitleText(false);
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
            
            .state('app.register', {
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
                        template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-chalet').classList.toggle('on');
                            }, 200);
                        }
                    }
                }
            })

            .state('app.chalet_single', {
                url: '/chalet/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/chalet_single.html',
                        controller: 'ChaletSingletCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-chalet-single" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-chalet-single').classList.toggle('on');
                            }, 900);
                        }
                    }
                }
            })

            /*
            .state('app.classifica', {
                url: '/classifica',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/classifica.html',
                        controller: 'ClassificaCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-classifica" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-classifica').classList.toggle('on');
                            }, 600);
                        }
                    }
                }
            })

                        .state('app.vota', {
                url: '/vota',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/vota.html',
                        controller: 'VotaCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-vota" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                             document.getElementById('fab-vota').classList.toggle('on');
                             }, 800);
                        }
                    }
                }
            })

            .state('app.contatti', {
                url: '/contatti',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contatti.html',
                        controller: 'ContattiCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-contatti" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                             document.getElementById('fab-contatti').classList.toggle('on');
                             }, 800);
                        }
                    }
                }
            })
            
                  .state('app.blog', {
                url: '/blog',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/blog.html',
                        controller: 'BlogCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-blog" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                             document.getElementById('fab-blog').classList.toggle('on');
                             }, 800);
                        }
                    }
                }
            })
            
            */
            
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });
