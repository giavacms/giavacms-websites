'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

  .controller('Profilo', ['$scope', '$interval', '$log', '$state', 'AuthenticationService',
    function ($scope, $interval, $log, $state, AuthenticationService) {

      // change this to true when login succeeds
      AuthenticationService.isLogged().then(function (success) {
        if (!success) {
          $state.go('login');
        }
        else {
          $scope.phone = AuthenticationService.getUsername()
          $scope.fullname = AuthenticationService.getFullname();
        }
      });

      $scope.logout = function () {
        AuthenticationService.logout();
      };

      $scope.$on('logout-complete', function () {
        $state.go('home');
      });

    }])

    $scope.pictures = {};
    
    $scope.uploadFile = function () {
            console.log('file is ' + JSON.stringify(file));
            var uploadUrl = "http://localhost:8080/api/v1/richcontents/1-agosto-ore-2130--le-marche-i-manicomi-i-matti-gli-amori/images";
            var fileObj = {};
            fileObj.name = $scope.name;
            fileObj.description = $scope.description;
            fileObj.file = $scope.myFile;
            fileUpload.uploadFileToUrl(uploadUrl, fileObj);
        };

  .
  config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('profilo', {
        url: '/profilo',
        controller: 'Profilo',
        templateUrl: 'views/profilo.html',
        ncyBreadcrumb: {
          label: 'Profilo'
        }
      })

  }]);
