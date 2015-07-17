'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')
    .controller('Home', ['$scope', 'ChaletService', '$interval', function ($scope, ChaletService, $interval) {


        var refresh = function () {
            ChaletService.getRandom(12).then(function (data) {
                $scope.model = data;
            });
        }

        $scope.size = function (name) {
            return name.length;
        }
        refresh();
        $interval(refresh, 10000);

    }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('home', {
                url: '/',
                controller: 'Home',
                templateUrl: 'views/home.html',
                ncyBreadcrumb: {
                    label: 'Home page'
                }
            })

    }]);