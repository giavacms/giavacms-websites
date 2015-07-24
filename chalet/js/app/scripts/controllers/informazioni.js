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
                title: 'Come si fa'
            })

            .state('cosa-si-vince', {
                url: '/cosa-si-vince',
                controller: 'Informazioni',
                templateUrl: 'views/cosa-si-vince.html',
                title: 'Cosa si vince'
            })

            .state('cookie-policy', {
                url: '/cookie-policy',
                controller: 'Informazioni',
                templateUrl: 'views/cookie-policy.html',
                title: 'Cookie Policy'
            })

            .state('privacy', {
                url: '/privacy',
                controller: 'Informazioni',
                templateUrl: 'views/privacy.html',
                title: 'Privacy'
            })


    }]);

