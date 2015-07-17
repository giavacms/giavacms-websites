/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su FriendsCtrl

    .controller('BlogCtrl',
    ['$scope', 'BlogService', 'IonicService', 'APP_PROPERTIES', '$timeout',
        function ($scope, BlogService, IonicService, APP_PROPERTIES, $timeout) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with the chalets
            $scope.models = [];

            $scope.howMany = 50;
            var pushModel = function (from) {
                BlogService.getList({}, from, $scope.howMany).then(function (data) {
                    if (data && data.length > 0) {
                        $scope.models.push(data);
                        if (data.length < $scope.howMany) {
                            pushModel(from + $scope.howMany);
                        }
                    }
                    else {
                        IonicService.motion($scope, 'fadeSlideInRight');
                    }
                });
            }

            pushModel(0);

            $scope.modelIndex = 0;

            $scope.imgSrc = function (src) {
                if (src) {
                    if (src.indexOf('http') === 0) {
                        return src;
                    }
                    else {
                        return APP_PROPERTIES.PROTOCOL + "://" + APP_PROPERTIES.HOST + APP_PROPERTIES.CONTEXT + "/img/" + src;
                    }
                }
            }

            $timeout(function () {
                document.getElementById('fab-blog-plus').classList.toggle('on');
                document.getElementById('fab-blog-minus').classList.toggle('on');
            }, 900);


        }])

