/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su LoginCtrl

    .controller('LoginCtrl', ['$scope', '$timeout', '$log', '$state', 'AuthenticationService', 'IonicService', function ($scope, $timeout, $log, $state, AuthenticationService, IonicService) {

        IonicService.clear($scope);

        // change this to true when login succeeds
        $scope.loginOk = AuthenticationService.isLogged();

        // use cordova to get it from device or leave user input it
        $scope.phone;

        $scope.login = function () {
            AuthenticationSerivce.login($scope.phone);
        }

        // try to login by means of the authentication service
        $scope.numbertocall;

        $scope.$on('login-unconfirmed', function () {
            $scope.numbertocall = AuthenticationService.getTocall();
            if ($scope.numbertocall) {
                while (!$scope.loginOk) {
                    $log.info('not logged');
                    $timeout(function () {
                        AuthenticationService.confirm();
                    }, 2000);
                }
            }
        });

        $scope.$on('login-confirmed', function () {
            $scope.loginOk = true;
            $state.go('app.home');
        });

        IonicService.ink($scope);

        $scope.logout = function () {
            $state.go('app.login');
        }


    }])

;
