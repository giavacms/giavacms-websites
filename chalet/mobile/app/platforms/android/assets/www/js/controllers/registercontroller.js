/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su LoginCtrl

    .controller('RegisterCtrl', ['$scope', '$interval', '$log', '$state', 'AuthenticationService', 'IonicService',
        function ($scope, $interval, $log, $state, AuthenticationService, IonicService) {

            IonicService.clear($scope);

            // use cordova to get it from device or leave user input it
            $scope.registration = {};
            $scope.accept = false;
            //$scope.phone;
            //$scope.name;
            //$scope.surname;

            $scope.register = function () {
                AuthenticationService.register($scope.registration.phone, $scope.registration.name, $scope.registration.surname);
            }

            // try to register by means of the authentication service
            $scope.numberToCall;

            // change this to true when login succeeds
            $scope.loginOk = false;

            var timer = {};

            $scope.$on('registration-unconfirmed', function () {
                $scope.numbertocall = AuthenticationService.getTocall();
                if ($scope.numbertocall) {
                    $log.info('not logged');
                    timer = $interval(function () {
                        AuthenticationService.confirm();
                    }, 2000);

                }
            });

            $scope.$on('login-confirmed', function () {
                if (timer) {
                    $interval.cancel(timer);
                    timer = undefined;
                }
                $scope.loginOk = true;
                $state.go('app.home');
            });

            IonicService.ink($scope);

        }])

;
