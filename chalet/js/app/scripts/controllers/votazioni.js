'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

    .controller('Votazioni', ['$scope', '$interval', '$log', '$state', 'AuthenticationService', 'VotazioniService',
        function ($scope, $interval, $log, $state, AuthenticationService, VotazioniService) {

            // change this to true when login succeeds
            AuthenticationService.isLogged().then(function (success) {
                if (!success) {
                    $state.go('login');
                }
                else {
                    $scope.phone = AuthenticationService.getUsername();
                    $scope.fullname = AuthenticationService.getFullname();
                    VotazioniService.getList({'obj.phone': $scope.phone}, 0, 0).then(function (data) {
                        $scope.model = data;
                    });
                }
            });


        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('votazioni', {
                url: '/profilo/votazioni',
                controller: 'Votazioni',
                templateUrl: 'views/votazioni.html',
                title: 'Le tue Votazioni'
            })

    }]);
