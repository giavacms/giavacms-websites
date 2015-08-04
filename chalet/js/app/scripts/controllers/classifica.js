'use strict';

angular.module('jsApp')

    .controller('Classifica', ['$scope', 'ClassificaService', 'ChaletService', '$state',
        function ($scope, ClassificaService, ChaletService, $state) {
            ClassificaService.getLast(function (element) {
                $scope.element = element;
                $state.current.title = 'Classifica del ' + $scope.element.name;
            });

        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('classifica', {
                url: '/classifica',
                controller: 'Classifica',
                templateUrl: 'views/classifica.html',
                title: 'Classifica'
            })

            .state('classifica2', {
                url: '/classifica2',
                controller: 'Classifica',
                templateUrl: 'views/new/classifica.html',
                title: 'Classifica'
            })

    }])

