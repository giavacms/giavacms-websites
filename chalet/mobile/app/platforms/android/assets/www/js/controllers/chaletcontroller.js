/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su FriendsCtrl

    .controller('ChaletCtrl',
    ['$scope', 'ChaletService', 'IonicService', 'APP_PROPERTIES',
        function ($scope, ChaletService, IonicService, APP_PROPERTIES) {

            // Headers and co
            IonicService.expand($scope);
            $scope.from = 0;
            $scope.to = 20;
            $scope.pageSize = 20;
            $scope.max=0;


            // fill this with the chalets
            $scope.model = [];


            var load = function () {
                ChaletService.getListSize().then(function (max) {
                    $scope.max = max;
                });
                ChaletService.getList({}, $scope.from, $scope.to).then(function (data) {
                    $scope.model = data;
                    IonicService.motion($scope, 'fadeSlideInRight');
                });
            }

            load();

            $scope.next = function () {
                var next = parseInt($scope.from) + parseInt($scope.pageSize);
                if (next < 0) {
                    next = 0;
                } else if ((next >= 0) && (next <= ChaletService.getListSize())) {
                    next = next;
                } else if (next > ChaletService.getListSize()) {
                    next = ChaletService.getListSize();
                }
                $scope.from = next;
                $scope.to = next + parseInt($scope.pageSize);
                load();

            }

            $scope.previous = function () {
                var next = parseInt($scope.from) - parseInt($scope.pageSize);

                if (next < 0) {
                    next = 0;
                } else if ((next >= 0) && (next <= ChaletService.getListSize())) {
                    next = next;
                } else if (next > ChaletService.getListSize()) {
                    next = ChaletService.getListSize();
                }
                $scope.from = next;
                $scope.to = next + parseInt($scope.pageSize);
                load();

            }

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

        }]);

