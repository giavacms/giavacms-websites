/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su LoginCtrl

    .controller('RegisterCtrl', ['$scope', '$timeout', '$log', '$state', 'AuthenticationService', 'IonicService', function ($scope, $timeout, $log, $state, AuthenticationService, IonicService) {

        IonicService.clear($scope);

        // use cordova to get it from device or leave user input it
        $scope.phone;
        $scope.name;
        $scope.surname;
        $scope.accept = false;

        $scope.register = function () {
            AuthenticationSerivce.register($scope.phone, $scope.name, $scope.surname);
        }

        // try to register by means of the authentication service
        $scope.numberToCall;

        // change this to true when login succeeds
        $scope.loginOk = false;

        $scope.$on('registration-unconfirmed', function () {
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

    }])

;
