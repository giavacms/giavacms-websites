'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

    .controller('Profilo', ['$scope', '$interval', '$log', '$state', 'AuthenticationService', 'PhotoService', '$rootScope', '$anchorScroll', '$location',
        function ($scope, $interval, $log, $state, AuthenticationService, PhotoService, $rootScope, $anchorScroll, $location) {

            // change this to true when login succeeds
            AuthenticationService.isLogged().then(function (success) {
                if (!success) {
                    $state.go('login');
                }
                else {
                    $scope.phone = AuthenticationService.getUsername()
                    $scope.fullname = AuthenticationService.getFullname();
                    $state.current.title = 'Benvenuto ' + $scope.fullname;
                }
            });


            $scope.predicate = 'created';
            $scope.reverse = true;
            var overrides = {
                scrollTo: 'gallery'
            };
            Pager($log, $scope, PhotoService, overrides, $anchorScroll, $location);

        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('profilo', {
                url: '/profilo',
                controller: 'Profilo',
                templateUrl: 'views/profilo.html',
                title: 'Profilo'
            })

    }]);
