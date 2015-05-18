'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jsApp
 */
angular.module('fiorenzopizza')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
