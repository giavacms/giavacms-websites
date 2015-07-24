/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su profile

    .controller('ChaletSingleCtrl',
    ['$scope', '$stateParams', 'ChaletService', 'IonicService', 'APP_PROPERTIES', 'ClassificaService', '$timeout',
        function ($scope, $stateParams, ChaletService, IonicService, APP_PROPERTIES, ClassificaService, $timeout) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with the desired element
            $scope.element = {};
            ChaletService.getElement($stateParams.id).then(function (element) {
                $scope.element = element;


                $scope.backgroundImage = "url('img/votalatuaestate_logo_black.jpg')";
                if (element.images && element.images.length > 0) {
                    $scope.backgroundImage = "url('" + $scope.imgSrc(element.images[0]) + "')";
                }
            });

            // Set Motion
            IonicService.motion($scope, 'slideUp', '.slide-up', 300);
            IonicService.motion($scope, 'fadeSlideIn', '.animate-fade-slide-in', 700);

            // Set Ink
            IonicService.ink($scope);

            $scope.imgSrc = function (src) {
                if (src && src.filename) {
                    if (src.filename.indexOf('http') === 0) {
                        return src;
                    }
                    else {
                        return APP_PROPERTIES.PROTOCOL + "://" + APP_PROPERTIES.HOST + "/img/" + src.filename;
                    }
                }
            }

            $timeout(function () {
                document.getElementById('fab-chalet-vota').classList.toggle('on');
                document.getElementById('fab-chalet-picture').classList.toggle('on');
            }, 500);

            $scope.vote = {style: 'button-calm-900', message: 'VOTA IL TUO CHALET PREFERITO'};

            $scope.vota = function () {
                var votePromise = ClassificaService.vota($scope.element.licenseNumber);
                votePromise.then(function (success_unused) {
                    if (!$scope.vote.times) {
                        $scope.vote.times = 1;
                    }
                    else {
                        $scope.vote.times++;
                    }
                    $scope.vote.style = 'button-balanced';
                    $scope.vote.message = 'GRAZIE PER AVER VOTATO' + ($scope.vote.times == 1 ? '' : $scope.vote.times == 2 ? ' DI NUOVO' : ' ANCORA' );
                }, function (reason_unused) {
                    $scope.vote.style = 'button-assertive';
                    $scope.vote.message = 'HAI SUPERATO IL MASSIMO NUMERO DI VOTI PER GIORNATA';
                });

            }

        }]);

