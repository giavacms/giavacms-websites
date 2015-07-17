'use strict';

angular.module('jsApp')

    .directive('tabheader', function () {
        return {
            restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            templateUrl: "views/layout/tab-header.html",
            controller: ['$scope', '$filter', function ($scope, $filter) {
                console.log('tab-header');
            }]
        }
    });