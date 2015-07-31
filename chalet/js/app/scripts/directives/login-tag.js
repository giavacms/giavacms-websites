'use strict';

angular.module('jsApp')

    .directive('loginTag', function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            templateUrl: "views/layout/login-tag.html",
            controller: ['$scope', '$filter', '$document', '$state', function ($scope, $filter, $document, $state) {
                console.log('tabHeader');

                $scope.$on('login-confirmed', function () {
                    console.log('tabHeader - login-confirmed');
                    $scope.logged = true;
                    $state.go('profilo')
                });

                $scope.$on('logout-complete', function () {
                    console.log('tabHeader - logout-complete');
                    $scope.logged = false;
                    $state.go('login')
                });

            }]
        }
    });