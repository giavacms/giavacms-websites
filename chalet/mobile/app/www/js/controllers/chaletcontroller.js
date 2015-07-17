/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

	// basato su FriendsCtrl

    .controller('ChaletCtrl',
    ['$scope', 'ChaletService', 'IonicService',
        function ($scope, ChaletService, IonicService) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with the chalets
            $scope.model = [];
            ChaletService.getList({}, 0, 0).then(function (data) {
                $scope.model = data;
                IonicService.motion($scope, 'fadeSlideInRight');
            });

        }])

