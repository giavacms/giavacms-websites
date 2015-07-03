'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
