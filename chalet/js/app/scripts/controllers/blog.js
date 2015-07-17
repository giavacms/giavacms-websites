'use strict';

angular.module('jsApp')

    .controller('Blog', ['$scope', 'BlogService', function ($scope, ChaletService) {

        $scope.models = [];

        ChaletService.getList({}, 0, 19).then(function (data) {
            $scope.models[0] = data;
        });

    }])


    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.
            state('blog', {
                url: '/blog',
                controller: 'Blog',
                templateUrl: 'views/blog.html',
                ncyBreadcrumb: {
                    label: 'blog'
                }
            })

    }]);

