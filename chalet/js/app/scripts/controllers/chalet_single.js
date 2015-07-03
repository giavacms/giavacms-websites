'use strict';

angular.module('jsApp')

  .controller('ChaletSingle',
  ['ChaletService', '$stateParams', '$state', '$scope', '$location',
    function (ChaletService, $stateParams, $state, $scope, $location) {

      ChaletService.getElement($stateParams.id, function (element) {
        $scope.element = element;
      });

      $scope.voteForMe = function()
      {
        $location.path('/vota/' + $scope.element.licenseNumber);
      }

    }])


  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('chalet_single', {
        url: '/chalet/:id',
        controller: 'ChaletSingle',
        templateUrl: 'views/chalet_single.html',
        ncyBreadcrumb: {
          label: 'chalet single'
        }
      })


  }])

