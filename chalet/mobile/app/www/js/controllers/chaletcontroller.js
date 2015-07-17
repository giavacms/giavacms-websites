/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su FriendsCtrl

    .controller('ChaletCtrl',
    ['$scope', 'ChaletService', 'IonicService', 'APP_PROPERTIES',
        function ($scope, ChaletService, IonicService, APP_PROPERTIES) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with the chalets
            $scope.model = [];
            ChaletService.getList({}, 0, 0).then(function (data) {
                $scope.model = data;
                IonicService.motion($scope, 'fadeSlideInRight');
            });

            $scope.imgSrc = function (src) {
                if (src) {
                    if (src.indexOf('http') === 0) {
                        return src;
                    }
                    else {
                        return APP_PROPERTIES.PROTOCOL + "://" + APP_PROPERTIES.HOST + APP_PROPERTIES.CONTEXT + "/img/" + src;
                    }
                }
            }

        }])

