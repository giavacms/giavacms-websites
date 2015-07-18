'use strict';

angular.module('jsApp')

    .controller('Informazioni', ['$scope', 'BlogService', function ($scope, ChaletService) {

        $scope.models = [];

        ChaletService.getList({}, 0, 19).then(function (data) {
            $scope.models[0] = data;
        });

    }])


    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.
            state('informazioni', {
                url: '/informazioni',
                controller: 'Informazioni',
                templateUrl: 'views/informazioni.html',
                ncyBreadcrumb: {
                    label: 'informazioni'
                }
            })

    }]);

