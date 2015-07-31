'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

    .controller('Profilo', ['$scope', '$interval', '$log', '$state', 'AuthenticationService', 'PhotoService',
        function ($scope, $interval, $log, $state, AuthenticationService, PhotoService) {

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


            $scope.model = {};

            var orderBy = $scope.predicate + ($scope.reverse ? ' desc' : ' asc')
            PhotoService.getList($scope.search, $scope.startRow, $scope.pageSize, orderBy).then(
                // successo
                function (data) {
                    if (data) {
                        $scope.model = data;
                        // nessun risultato
                        if ($scope.model.length == 0) {
                            $scope.listSize = 0;
                            $scope.pages = [];
                        }
                        // ci sono dati. calcolo le pagine
                        else {
                            $scope.listSize = RsService.getSize();
                            $scope.pages = [];
                            var p = 0;
                            for (var i = 1; i <= Number($scope.listSize); i += Number($scope.pageSize)) {
                                p++;
                                $scope.pages.push(p);
                            }
                        }
                    }
                },
                // errorre
                function () {
                    if (!$scope.model) {
                        $scope.message = 'Dati non disponibili.';
                    }
                    $mdDialog.show(
                        $mdDialog.alert().title('Errore').content('Dati non disponibili').ok('Ok')
                    );
                });

        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('profilo', {
                url: '/profilo',
                controller: 'Profilo',
                templateUrl: 'views/profilo.html',
                ncyBreadcrumb: {
                    label: 'Profilo'
                }
            })

    }]);
