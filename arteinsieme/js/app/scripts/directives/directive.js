'use strict';

angular.module('jsApp')


    .directive('header', [function () {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/header.html',
            scope: {
                title: '=',
                description: '@'
            }
        };
    }])

    .directive('footerSite', [function () {
        return {
            restrict: 'EA',
            templateUrl: 'views/templates/footer.html'
        };
    }])


;