'use strict';

angular.module('jsApp')

    .controller('Informazioni', ['$scope', 'ClassificaService', function ($scope, ClassificaService) {

        ClassificaService.getLast(function (element) {
            $scope.element = element;
        })

    }])


    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('informazioni', {
                url: '/informazioni',
                controller: 'Informazioni',
                templateUrl: 'views/informazioni.html',
                ncyBreadcrumb: {
                    label: 'informazioni'
                }
            })

            .state('cookie-policy', {
                url: '/cookie-policy',
                controller: 'Informazioni',
                templateUrl: 'views/cookie-policy.html',
                ncyBreadcrumb: {
                    label: 'informazioni'
                }
            })


    }]);

