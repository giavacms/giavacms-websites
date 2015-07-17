'use strict';

angular.module('jsApp')

    .directive('tabfooter', function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            templateUrl: "views/layout/tab-footer.html",
            controller: ['$scope', '$filter', function ($scope, $filter) {
                // Your behaviour goes here :)
            }]
        }
    });