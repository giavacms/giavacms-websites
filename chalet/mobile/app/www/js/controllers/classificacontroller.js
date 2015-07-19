/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su FriendsCtrl

    .controller('ClassificaCtrl',
    ['$scope', 'ClassificaService', 'ChaletService', 'IonicService', 'APP_PROPERTIES',
        function ($scope, ClassificaService, ChaletService, IonicService, APP_PROPERTIES) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with the latest parade
            $scope.element = {};

            $scope.backgroundImages = {};
            $scope.chaletIds = {};

            ClassificaService.getLast(function (element) {
                $scope.element = element;
                var date = new Date(parseInt(element.data));
                $scope.paradeDate = date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear() + ' alle ore ' + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

                // Set Motion
                // angular.element(document.querySelector('#to-animate-fade-slide-in')).addClass('animate-fade-slide-in');
                //document.getElementById('to-animate-fade-slide-in').classList.toggle('animate-fade-slide-in');
                IonicService.motion($scope, 'fadeSlideInRight');
            });

            var imgSrc = function (src) {
                if (src) {
                    if (src.filename.indexOf('http') === 0) {
                        return src;
                    }
                    else {
                        return APP_PROPERTIES.PROTOCOL + "://" + APP_PROPERTIES.HOST + "/img/" + src;
                    }
                }
            };

            // Set Ink
            IonicService.ink($scope);


        }])

