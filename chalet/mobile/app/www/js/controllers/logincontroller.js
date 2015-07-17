/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

	// basato su LoginCtrl

    .controller('LoginCtrl', ['$scope', '$timeout', '$log', '$state', 'AuthenticationService', 'IonicService', function ($scope, $timeout, $log, $state, AuthenticationService, IonicService) {

        IonicService.clear($scope);

        // use cordova to get it from device or leave user input it
        $scope.phone;

        // change this to true when login succeeds
        var loginOk = false;

        // try to login by means of the authentication service
        $scope.numberToCall;
        // $scope.numberToCall = AuthenticationSerivce.login($scope.phone)['numberToCall'];

        IonicService.ink($scope);

        // loop while waiting for login with given phone number to succeed
        var login = function () {
            while (!loginOk) {
                $timeout(function () {
                    loginOk = false;
                    $log.info('not logged');
                    if (loginOk) {
                        $state.go('home', {}, {reload: true, inherit: false});
                    }
                }, 1000);

            }
        }

    }])

;
