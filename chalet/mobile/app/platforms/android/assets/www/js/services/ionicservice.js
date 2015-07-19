'use strict';

/*
 @see
 http://www.bennadel.com/blog/2751-scope-applyasync-vs-scope-evalasync-in-angularjs-1-3.htm
 http://www.bennadel.com/blog/2605-scope-evalasync-vs-timeout-in-angularjs.htm

 */
angular.module('votalatuaestate')

    .factory('IonicService', ['$q', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$log',
        function ($q, $timeout, ionicMaterialInk, ionicMaterialMotion, $log) {

            var clear = function ($scope) {
                $scope.$parent.clearFabs();
                $timeout(function () {
                    $scope.$parent.hideHeader();
                }, 0);
            };

            var expand = function ($scope) {
                $scope.$parent.showHeader();
                $scope.$parent.clearFabs();
                $scope.isExpanded = true;
                $scope.$parent.setExpanded(true);
                $scope.$parent.setHeaderFab(false);
            };

            var ink = function ($scope) {
                $scope.$applyAsync(
                    function () {
                        $log.info('ionicMaterialInk.displayEffect() applied async');
                        ionicMaterialInk.displayEffect();
                    });
            };

            var motion = function ($scope, method, selectors, timeout) {
                $scope.$applyAsync(
                    function () {
                        $log.info('ionicMaterialMotion.' + method + '() applied async')
                        var options = {};
                        if (selectors) {
                            options['selector'] = selectors
                        }
                        if (timeout) {
                            $timeout(function () {
                                ionicMaterialMotion[method](options);
                            }, timeout)
                        }
                        else {
                            ionicMaterialMotion[method](options);
                        }
                    });
            };

            var service = {

                clear: clear,
                expand: expand,
                ink: ink,
                motion: motion

            };

            return service;

        }])