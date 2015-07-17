/* global angular, document, window */
'use strict';

angular.module('votalatuaestate')

    // basato su profile

    .controller('BlogSingleCtrl',
    ['$scope', '$stateParams', 'BlogService', 'IonicService', 'APP_PROPERTIES',
        function ($scope, $stateParams, BlogService, IonicService, APP_PROPERTIES) {

            // Headers and co
            IonicService.expand($scope);

            // fill this with the desired element
            $scope.element = {};
            BlogService.getElement($stateParams.id).then(function (element) {
                $scope.element = element;


                $scope.backgroundImage = "url('img/black-logo.jpg')";
                if (element.images && element.images.length > 0) {
                    $scope.backgroundImage = "url('" + $scope.imgSrc(element.images[0]) + "')";
                }
            });

            // Set Motion
            IonicService.motion($scope, 'slideUp', '.slide-up', 300);
            IonicService.motion($scope, 'fadeSlideIn', '.animate-fade-slide-in', 700);

            // Set Ink
            IonicService.ink($scope);

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

        }])

