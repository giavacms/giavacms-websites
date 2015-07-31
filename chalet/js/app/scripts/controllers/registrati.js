/* global angular, document, window */
'use strict';

angular.module('jsApp')

  // basato su LoginCtrl

  .controller('Registrati', ['$interval', '$log', '$rootScope', '$scope', '$state', 'AuthenticationService',
    function ($interval, $log, $rootScope, $scope, $state, AuthenticationService) {

      $scope.registration = {name: 'test'};
      $scope.privacy = false;

      $scope.register = function () {
        AuthenticationService.register($scope.registration.phone, $scope.registration.name, $scope.registration.surname);
      }

      // try to register by means of the authentication service
      $scope.numbertocall;

      // change this to true when login succeeds
      $scope.loginOk = false;

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
        if (from.name == 'registrati') {
          cleanTimer();
        }
      });

      $scope.$on('registration-unconfirmed', function () {
        $scope.numbertocall = AuthenticationService.getTocall();
        if ($scope.numbertocall) {
          $log.info('not logged');
          $rootScope.timer = $interval(function () {
            $log.info('registration timer is running...');
            AuthenticationService.confirm();
          }, 2000);

        }
      });

      $scope.$on('login-confirmed', function () {
        cleanTimer();
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
