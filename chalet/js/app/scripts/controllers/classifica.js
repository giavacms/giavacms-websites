'use strict';

angular.module('jsApp')

    .controller('Classifica', ['$scope', 'ClassificaService', 'ChaletService',
        function ($scope, ClassificaService, ChaletService) {
            ClassificaService.getLast(function (element) {
                $scope.element = element;
            });

        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('classifica', {
                url: '/classifica',
                controller: 'Classifica',
                templateUrl: 'views/classifica.html',
                ncyBreadcrumb: {
                    label: 'classifica'
                }
            })

            .state('classifica2', {
                url: '/classifica2',
                controller: 'Classifica',
                templateUrl: 'views/new/classifica.html',
                ncyBreadcrumb: {
                    label: 'classifica2'
                }
            })

    }])

