'use strict';

angular.module('jsApp')

    .controller('ChaletSingle',
    ['ChaletService', '$stateParams', '$state', '$scope', '$location',
        function (ChaletService, $stateParams, $state, $scope, $location) {

            //DA CHIUDERE
            //DA CHIUDERE
            //DA CHIUDERE  //DA CHIUDERE  //DA CHIUDERE
            //DA CHIUDERE


            if ($stateParams.id) {
                ChaletService.getElement($stateParams.id).then(function (element) {
                    $scope.element = element;
                    $scope.title = $scope.element.name;
                });
            }
            if ($stateParams.licenseNumber) {
                ChaletService.getElementByLicenseNumber($stateParams.licenseNumber).then(function (element) {
                    $scope.element = element;
                    $scope.title = $scope.element.name;
                });
            }

        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('chalet_id', {
                url: '/chalet_id/:id',
                controller: 'ChaletSingle',
                templateUrl: 'views/chalet_single.html'
            })
            .state('chalet_licenseNumber', {
                url: '/chalet_licenseNumber/:licenseNumber',
                controller: 'ChaletSingle',
                templateUrl: 'views/chalet_single.html'
            })


    }])

