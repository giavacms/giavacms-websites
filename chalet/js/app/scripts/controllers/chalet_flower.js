'use strict';

angular.module('jsApp')

    .controller('Chalet', ['$scope', 'ChaletService', function ($scope, ChaletService) {

        ChaletService.getList().then(function (data) {
            $scope.model = data;
        });


    }])


    .
    config(['$stateProvider', function ($stateProvider) {

        $stateProvider.
            state('chalet', {
                url: '/chalet',
                controller: 'Chalet',
                templateUrl: 'views/chalet.html',
                ncyBreadcrumb: {
                    label: 'chalet'
                }
            })

    }])
