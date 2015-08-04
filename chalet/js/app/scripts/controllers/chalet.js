'use strict';

angular.module('jsApp')

    .controller('Chalet', ['$scope', 'ChaletService', '$filter', function ($scope, ChaletService, $filter) {

        $scope.search = {};
        $scope.model = {};
        $scope.filteredModel = [];

        $scope.filtra = function () {
            $scope.filteredModel = $filter('filter')($scope.model, $scope.search);
        }

        ChaletService.getListSize().then(function (max) {
            ChaletService.getList({}, 0, max).then(function (model) {
                $scope.model = model;
                $scope.filtra();
            });
        });

    }])


    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.
            state('chalet', {
                url: '/chalet',
                controller: 'Chalet',
                templateUrl: 'views/chalet.html',
                title: 'Vota il tuo Chalet di San Benedetto del Tronto',
                web_url: '//votalatua.estate/#!/chalet',
                description: 'Scegli il tuo chalet preferito per servizi, cortesia, prezzi o semplicemente per simpatia. Inserisci i tuoi dati e il tuo numero di telefono, poi fai uno squillo al numero indicato.',
                image: '//votalatua.estate/img/logo-no-chalet.jpg'
            })

    }]);

