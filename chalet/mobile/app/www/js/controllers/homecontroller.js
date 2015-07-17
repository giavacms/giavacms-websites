/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

	// basato su ActivityCtrl

    .controller('HomeCtrl',
    ['$scope', 'ChaletService', 'IonicService', '$interval',
        function ($scope, ChaletService, IonicService, $interval) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with random chalets
            $scope.model = [];

            // function to query data
            var refresh = function () {
                ChaletService.getRandom(12).then(function (data) {
                    $scope.model = data;
                    IonicService.motion($scope, 'pushDown', '.push-down');
                    IonicService.motion($scope, 'fadeSlideInRight', '.animate-fade-slide-in .item');
                });
            }

            // first filling of model
            refresh();

            // model gets periodically refreshed
            $interval(refresh, 10000);


            // Activate ink for controller
            IonicService.ink($scope);

        }])
