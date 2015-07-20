'use strict';

angular.module('jsApp')

    .controller('Informazioni', ['$scope', 'ClassificaService', function ($scope, ClassificaService) {

        ClassificaService.getLast(function (element) {
            $scope.element = element;
        })

    }])


    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('come-si-fa', {
                url: '/come-si-fa',
                controller: 'Informazioni',
                templateUrl: 'views/come-si-fa.html',
                ncyBreadcrumb: {
                    label: 'come-si-fa'
                }
            })

            .state('cosa-si-vince', {
                url: '/cosa-si-vince',
                controller: 'Informazioni',
                templateUrl: 'views/cosa-si-vince.html',
                ncyBreadcrumb: {
                    label: 'cosa-si-vince'
                }
            })

            .state('cookie-policy', {
                url: '/cookie-policy',
                controller: 'Informazioni',
                templateUrl: 'views/cookie-policy.html',
                ncyBreadcrumb: {
                    label: 'cookie-policy'
                }
            })

            .state('privacy', {
                url: '/privacy',
                controller: 'Informazioni',
                templateUrl: 'views/privacy.html',
                ncyBreadcrumb: {
                    label: 'privacy'
                }
            })


    }]);

