'use strict';

angular.module('jsApp')

    .directive('profileTag', function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            templateUrl: "views/layout/profile-tag.html",
            controller: ['$scope', '$filter', '$document', function ($scope, $filter, $document) {

            }]
        }
    });