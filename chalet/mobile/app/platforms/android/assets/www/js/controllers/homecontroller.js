/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su ActivityCtrl

    .controller('HomeCtrl',
    ['$scope', '$state', 'ChaletService', 'IonicService', '$interval', 'APP_PROPERTIES','AuthenticationService',
        function ($scope, $state, ChaletService, IonicService, $interval, APP_PROPERTIES, AuthenticationService) {

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
                    //IonicService.motion($scope, 'blinds', '.animate-blinds * .item');
                });
            }

            // first filling of model
            refresh();

            // model gets periodically refreshed
//            $interval(refresh, 10000);


            // Activate ink for controller
            IonicService.ink($scope);

            $scope.view = function (id) {
                $state.go('app.chalet_single', {id: id});
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


        }])
