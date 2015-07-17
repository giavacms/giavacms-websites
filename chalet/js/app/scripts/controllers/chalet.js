'use strict';

angular.module('jsApp')

    .controller('Chalet', ['$scope', 'ChaletService', function ($scope, ChaletService) {

        $scope.models = [];

        ChaletService.getList({}, 0, 19).then(function (data) {
            $scope.models[0] = data;
        });
        ChaletService.getList({}, 20, 39).then(function (data) {
            $scope.models[1] = data;
        });
        ChaletService.getList({}, 40, 59).then(function (data) {
            $scope.models[2] = data;
        });
        ChaletService.getList({}, 60, 79).then(function (data) {
            $scope.models[3] = data;
        });
        ChaletService.getList({}, 80, 99).then(function (data) {
            $scope.models[4] = data;
        });
        ChaletService.getList({}, 100, 119).then(function (data) {
            $scope.models[5] = data;
        });

    }])


    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.
            state('chalet', {
                url: '/chalet',
                controller: 'Chalet',
                templateUrl: 'views/chalet.html',
                ncyBreadcrumb: {
                    label: 'chalet'
                }
            })

    }]);

