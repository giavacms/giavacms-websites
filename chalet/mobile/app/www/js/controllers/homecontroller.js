/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    .controller('HomeCtrl', function ($scope, $timeout, $stateParams, ionicMaterialInk) {
        $scope.$parent.clearFabs();
        $timeout(function () {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
    })

;
