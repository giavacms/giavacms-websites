'use strict';


angular.module('giavacms-private')

  .controller('MenuLeftController', ['$scope', '$stateParams', '$state', 'APP_PROPERTIES',
    function ($scope, $stateParams, $state, APP_PROPERTIES) {

      $scope.menuOn = 0;
      $scope.menuSwitchOn = function () {
        $scope.menuOn = 1;
      };

      $scope.menuSwitchOff = function () {
        $scope.menuOn = 0;
      };
    }]);
