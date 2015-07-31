'use strict';

angular.module('jsApp')

    .directive('loginTag', function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            templateUrl: "views/layout/login-tag.html",
            controller: ['$scope', '$filter', '$document', 'AuthenticationService', function ($scope, $filter, $document, AuthenticationService) {
                console.log('tabHeader');

                $scope.loginOk = true;

                AuthenticationService.isLogged().then(function (success) {
                    if (success) {
                        $scope.loginOk = success;
                    }
                });

            }]
        }
    });