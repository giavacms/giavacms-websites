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
                document.getElementById('to-animate-fade-slide-in').classList.toggle('animate-fade-slide-in');
                IonicService.motion($scope, 'fadeSlideIn', '.animate-fade-slide-in', 700);
            });

            var imgSrc = function (src) {
                if (src) {
                    if (src.indexOf('http') === 0) {
                        return src;
                    }
                    else {
                        return APP_PROPERTIES.PROTOCOL + "://" + APP_PROPERTIES.HOST + APP_PROPERTIES.CONTEXT + "/img/" + src;
                    }
                }
            };

            ChaletService.getList({}, 0, 0).then(function (chalets) {
                chalets.forEach(function (chalet) {
                    $scope.chaletIds[chalet.licenseNumber] = chalet.id;
                    if (chalet.images && chalet.images.length > 0) {
                        $scope.backgroundImages[chalet.licenseNumber] = "url('" + imgSrc(chalet.images[0]) + "')";
                    }
                    else {
                        $scope.backgroundImages[chalet.licenseNumber] = "url('img/black-logo.jpg')";
                    }
                });
            });

            // Set Ink
            IonicService.ink($scope);


        }])

