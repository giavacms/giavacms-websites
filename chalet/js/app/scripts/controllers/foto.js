'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

  .controller('Foto', ['$scope', '$interval', '$log', '$state', 'AuthenticationService', 'PhotoService',
    function ($scope, $interval, $log, $state, AuthenticationService, PhotoService) {

      // change this to true when login succeeds
      AuthenticationService.isLogged().then(function (success) {
        if (!success) {
          $state.go('login');
        }
        else {
          $scope.phone = AuthenticationService.getUsername()
          $scope.fullname = AuthenticationService.getFullname();
        }
      });


      $scope.predicate = 'created';
      $scope.reverse = true;
      var overrides = {};
      Pager($log, $scope, PhotoService, overrides);

    }])


  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('foto', {
        url: '/foto',
        controller: 'Foto',
        templateUrl: 'views/foto.html',
        ncyBreadcrumb: {
          label: 'Foto'
        }
      })

  }]);
