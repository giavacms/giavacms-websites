/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

	// basato su profile

    .controller('ChaletSingleCtrl',
    ['$scope', '$stateParams', 'ChaletService', 'IonicService',
        function ($scope, $stateParams, ChaletService, IonicService) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with the desired element
            $scope.element = {};
            ChaletService.getElement($stateParams.id).then(function (element) {
                $scope.element = element;
            });


            // Set Motion
            IonicService.motion($scope,'slideUp','.slide-up',300);
            IonicService.motion($scope,'fadeSlideIn','.animate-fade-slide-in',700);

            // Set Ink
            IonicService.ink($scope);

        }])

