/* global angular, document, window */
'use strict';

angular.module('jsApp')

  // basato su LoginCtrl

  .controller('Registrati', ['$interval', '$log', '$scope', '$state', 'AuthenticationService',
    function ($interval, $log, $scope, $state, AuthenticationService) {

      $scope.registration = {};
      $scope.privacy = false;

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
        $state.go('login');
      });

    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('registrati', {
        url: '/registrati',
        controller: 'Registrati',
        templateUrl: 'views/registrati.html',
        ncyBreadcrumb: {
          label: 'Registrati'
        }
      })

  }])
