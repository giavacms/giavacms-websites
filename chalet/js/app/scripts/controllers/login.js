'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

    .controller('Login', ['$scope', '$interval', '$log', '$rootScope', '$state', 'AuthenticationService',
        function ($scope, $interval, $log, $rootScope, $state, AuthenticationService) {

            // change this to true when login succeeds
            AuthenticationService.isLogged().then(function (success) {
                if (success) {
                    $state.go('profilo');
                }
                $scope.loginOk = success;
                $scope.unknown = false;
            });

            // use cordova to get it from device or leave user input it
            $scope.auth = {};

            $scope.login = function () {
                $scope.unknown = false;
                AuthenticationService.login($scope.auth.phone);
            }

            $scope.reset = function () {
                $scope.auth = {};
                $scope.loginOk = false;
                $scope.unknown = true;
                $scope.numbertocall = {};
                cleanTimer();
            }

            // timer cleanup
            var cleanTimer = function () {
                if ($rootScope.timer) {
                    $interval.cancel($rootScope.timer);
                }
                $rootScope.timer = undefined;
            }
            // sempre al caricamento del controller
            cleanTimer();
            // sempre all'uscita dallo stato
            $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
                if (from.name == 'login') {
                    cleanTimer();
                }
            });

            // try to login by means of the authentication service
            $scope.numbertocall;
            $scope.$on('login-unconfirmed', function () {
                $scope.numbertocall = AuthenticationService.getTocall(function () {
                });
                if ($scope.numbertocall) {
                    $log.info('not logged');
                    $rootScope.timer = $interval(function () {
                        $log.info('login timer is running...');
                        AuthenticationService.confirm();
                    }, 2000);
                }
            });

            $scope.$on('login-confirmed', function () {
                cleanTimer();
                $scope.loginOk = true;
                $scope.unknown = false;
            });

            $scope.$on('login-failed', function () {
                cleanTimer();
                $scope.loginOk = false;
                $scope.unknown = true;
            });

            $scope.goToRegister = function () {
                $state.go('registrati');
            };

            $scope.phone = function () {
                return AuthenticationService.getUsername()
            };
            $scope.fullname = function () {
                return AuthenticationService.getFullname();
            };

            $scope.logout = function () {
                AuthenticationService.logout();
            };

        }])


    .
    config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('login', {
                url: '/login',
                controller: 'Login',
                templateUrl: 'views/login.html',
                title: 'Login'
            })
            .state('logout', {
                url: '/logout',
                controller: ['AuthenticationService', function (AuthenticationService) {
                    AuthenticationService.logout();
                }],
                template: '',
                title: 'Logout'
            })

    }]);
