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
            .state('chalet_single', {
                url: '/chalet/:id',
                controller: 'ChaletSingle',
                templateUrl: 'views/chalet_single.html',
                ncyBreadcrumb: {
                    label: 'chalet single'
                }
            })
            .state('chalet_single2', {
                url: '/chalet2/:licenseNumber',
                controller: 'ChaletSingle',
                templateUrl: 'views/new/chalet_single.html',
                ncyBreadcrumb: {
                    label: 'chalet single licenseNumber'
                }
            })


    }])

