'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

    .controller('Foto', ['$scope', '$interval', '$log', '$state', 'AuthenticationService', 'PhotoService', '$anchorScroll', '$location', 'APP_PROPERTIES',
        function ($scope, $interval, $log, $state, AuthenticationService, PhotoService, $anchorScroll, $location, APP_PROPERTIES) {

            //LISTA CHALET che ho usato nelle foto
            $scope.chalets = [];

            // change this to true when login succeeds
            AuthenticationService.isLogged().then(function (success) {
                if (!success) {
                    $state.go('login');
                }
                else {
                    $scope.phone = AuthenticationService.getUsername()
                    $scope.fullname = AuthenticationService.getFullname();
                    $scope.supervisor = ( AuthenticationService.getRoles().indexOf('ADMIN') >= 0 || AuthenticationService.getRoles().indexOf('SUPERVISOR') >= 0 );
                    if ($scope.supervisor) {
                        $log.warn('SUPERVISOR!');
                    }
                    $state.current.title = $scope.admin ? 'Le foto' : 'Le tue foto';
                    PhotoService.getChalets($scope.phone).then(function (chalets) {
                        $scope.chalets = chalets;
                    });
                }
            });


            $scope.predicate = 'created';
            $scope.reverse = true;

            $scope.host = APP_PROPERTIES.CDN_PHOTO;

            var overrides = {
                pageSize: 16,
                shownPages: 3,
                scrollTo: 'gallery'
            };
            Pager($log, $scope, PhotoService, overrides, $anchorScroll, $location);

            $scope.approva = function (uuid) {
                PhotoService.approve(uuid).then(function (data) {
                    $scope.message = "approved";
                    $scope.refresh();
                });
            }

            $scope.disapprova = function (uuid) {
                PhotoService.unapprove(uuid).then(function (data) {
                    $scope.message = "unapproved";
                    $scope.refresh();
                });
            }

            $scope.elimina = function (uuid) {
                PhotoService.delete(uuid).then(function (data) {
                    $scope.message = "deleted";
                    $scope.refresh();
                });
            }


        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('foto', {
                url: '/profilo/foto',
                controller: 'Foto',
                templateUrl: 'views/foto.html',
                title: 'Foto'
            })

    }]);
