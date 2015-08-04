'use strict';

angular.module('jsApp')

    .controller('Contatti', ['$scope', 'BlogService', function ($scope, ChaletService) {

        $scope.models = [];

        ChaletService.getList({}, 0, 19).then(function (data) {
            $scope.models[0] = data;
        });

    }])


    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.
            state('contatti', {
                url: '/contatti',
                controller: 'Contatti',
                templateUrl: 'views/contatti.html',
                title: 'contatti'
            })

    }]);

