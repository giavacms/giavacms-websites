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
          $state.current.title = 'Le tue foto';
        }
      });


      //LISTA CHALET che ho usato nelle foto
      $scope.chalets = [];
      PhotoService.getChalets().then(function (chalets) {
        $scope.chalets = chalets;
      });

      $scope.predicate = 'created';
      $scope.reverse = true;
      var overrides = {};
      Pager($log, $scope, PhotoService, overrides);

      $scope.filtra = function() {
        PhotoService.getList(search)
      }

      $scope.approva = function (uuid) {
        PhotoService.approve(uuid).then(function (data) {
          $scope.message = "approved";
        });
      }

      $scope.disapprova = function (uuid) {
        PhotoService.unapprove(uuid).then(function (data) {
          $scope.message = "approved";
        });
      }

      $scope.elimina = function (uuid) {
        PhotoService.delete(uuid).then(function (data) {
          $scope.message = "deleted";
        });
      }


    }])


  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('foto', {
        url: '/profilo/foto',
        controller: 'Foto',
        templateUrl: 'views/foto.html',
        title: 'Foto'
      })

  }]);
