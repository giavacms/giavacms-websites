'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

    .controller('Votazioni', ['$scope', '$interval', '$log', '$state', 'AuthenticationService',
        function ($scope, $interval, $log, $state, AuthenticationService) {

            // change this to true when login succeeds
            AuthenticationService.isLogged().then(function (success) {
                if (!success) {
                    $state.go('login');
                }
                else {
                    $scope.phone = AuthenticationService.getUsername()
                    $scope.fullname = AuthenticationService.getFullname();
                }
            });

        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('votazioni', {
                url: '/votazioni',
                controller: 'votazioni',
                templateUrl: 'views/votazioni.html',
                ncyBreadcrumb: {
                    label: 'Votazioni'
                }
            })

    }]);
