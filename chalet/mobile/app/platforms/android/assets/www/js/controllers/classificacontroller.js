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

            var max = ChaletService.getListSize();

            var list = max.then(function (max) {
                return ChaletService.getList({}, 0, max);
            });

            var immaginiEtLinks = list.then(function(list) {
                list.forEach(function(chalet){
                    $scope.chaletIds[chalet.licenseNumber] = chalet.id;
                    if (chalet.images && chalet.images.length > 0) {
                        $scope.backgroundImages[chalet.licenseNumber] = "url('" + imgSrc(chalet.images[0]) + "')";
                    }
                    else {
                        $scope.backgroundImages[chalet.licenseNumber] = "url('img/votalatuaestate_logo_black.jpg')";
                    }
                });
            });

            var done = immaginiEtLinks.then(function() {
                ClassificaService.getLast(function (element) {
                    $scope.element = element;
                    var date = new Date(parseInt(element.data));
                    $scope.paradeDate = date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear() + ' ore ' + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

                    // Set Motion
                    // angular.element(document.querySelector('#to-animate-fade-slide-in')).addClass('animate-fade-slide-in');
                    //document.getElementById('to-animate-fade-slide-in').classList.toggle('animate-fade-slide-in');
                    IonicService.motion($scope, 'fadeSlideInRight');
                });
            });

            var imgSrc = function (src) {
                if (src) {
                    if (src.filename.indexOf('http') === 0) {
                        return src;
                    }
                    else {
                        return APP_PROPERTIES.PROTOCOL + "://" + APP_PROPERTIES.HOST + "/img/" + src.filename;
                    }
                }
            };

            // Set Ink
            IonicService.ink($scope);


        }])

