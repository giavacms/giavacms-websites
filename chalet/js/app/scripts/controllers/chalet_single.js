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
                });
            }
            if ($stateParams.licenseNumber) {
                ChaletService.getElementByLicenseNumber($stateParams.licenseNumber).then(function (element) {
                    $scope.element = element;
                });
            }
            ChaletService.getElement($stateParams.id).then(function (element) {
                $scope.element = element;
            });
        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('chalet_id', {
                url: '/chalet_id/:id',
                controller: 'ChaletSingle',
                templateUrl: 'views/chalet_single.html',
                ncyBreadcrumb: {
                    label: 'chalet single'
                }
            })
            .state('chalet_licenseNumber', {
                url: '/chalet_licenseNumber/:licenseNumber',
                controller: 'ChaletSingle',
                templateUrl: 'views/chalet_single.html',
                ncyBreadcrumb: {
                    label: 'chalet single licenseNumber'
                }
            })


    }])

