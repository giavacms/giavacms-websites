'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')
    .controller('Home', ['$scope', 'ChaletService', '$interval', function ($scope, ChaletService, $interval) {


        var refresh = function () {
            ChaletService.getRandom(12).then(function (data) {
                $scope.model = data;
            });
        }

        $scope.size = function (name) {
            return name.length;
        }
        refresh();
        $interval(refresh, 10000);

    }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('home', {
                url: '/',
                controller: 'Home',
                templateUrl: 'views/home.html',
                title: 'Vota la tua estate',
                web_url: '//votalatua.estate',
                description: 'Scegli il tuo chalet preferito per servizi, cortesia, prezzi o semplicemente per simpatia. Inserisci i tuoi dati e il tuo numero di telefono, poi fai uno squillo al numero indicato.',
                image: '//votalatua.estate/img/logo-no-chalet.jpg'
            })

    }]);