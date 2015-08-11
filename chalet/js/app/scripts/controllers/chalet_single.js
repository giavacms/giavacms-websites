'use strict';

angular.module('jsApp')

  .controller('ChaletSingle',
  ['$location', '$log', '$rootScope', '$scope', '$state', '$stateParams', 'ChaletPhotoService', 'ChaletService',
    function ($location, $log, $rootScope, $scope, $state, $stateParams, ChaletPhotoService, ChaletService) {

      //DA CHIUDERE
      //DA CHIUDERE
      //DA CHIUDERE  //DA CHIUDERE  //DA CHIUDERE
      //DA CHIUDERE

      $scope.model = [];

      $scope.predicate = 'created';
      $scope.reverse = true;

      $scope.host = "";

      var overrides = {
        pageSize: 4,
        shownPages: 3
      };


      if ($stateParams.id) {
        ChaletService.getElement($stateParams.id).then(function (element) {
          $scope.element = element;
          $state.current.title = 'Vota ' + $scope.element.name + " - concessione " + $scope.element.licenseNumber;
          $state.current.web_url = '//votalatua.estate/#!/chalet_id/' + $scope.element.id;
          $state.current.description = 'Scegli ' + $scope.element.name + " - concessione " + $scope.element.licenseNumber;
          if ($scope.element.images.length == 0) {
            $state.current.image = '//votalatua.estate/img/logo-no-chalet.jpg';
          } else {
            $state.current.image = '//votalatua.estate/img/' + $scope.element.images[0]['filename'];
          }
          ChaletPhotoService.setChaletId(element.id);
          Pager($log, $scope, ChaletPhotoService, overrides);
        });
      }
      if ($stateParams.licenseNumber) {
        ChaletService.getElementByLicenseNumber($stateParams.licenseNumber).then(function (element) {
          $scope.element = element;
          $state.current.title = 'Vota ' + $scope.element.name + " - concessione " + $scope.element.licenseNumber;
          $state.current.web_url = '//votalatua.estate/#!/chalet_id/' + $scope.element.id;
          $state.current.description = 'Scegli ' + $scope.element.name + " - concessione " + $scope.element.licenseNumber;
          if ($scope.element.images.length == 0) {
            $state.current.image = '//votalatua.estate/img/logo-no-chalet.jpg';
          } else {
            $state.current.image = '//votalatua.estate/img/' + $scope.element.images[0]['filename'];
          }
          ChaletPhotoService.setChaletId(element.id);
          Pager($log, $scope, ChaletPhotoService, overrides);
        });
      }

      $scope.single = {};
      $scope.toggle = function (photo) {
        if ($scope.single['name'] == photo.name) {
          $scope.single = {}
        }
        else {
            $scope.single = photo;
        }
      }

    }])


  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('chalet_id', {
        url: '/chalet_id/:id',
        controller: 'ChaletSingle',
        templateUrl: 'views/chalet_single.html'
      })
      .state('chalet_licenseNumber', {
        url: '/chalet_licenseNumber/:licenseNumber',
        controller: 'ChaletSingle',
        templateUrl: 'views/chalet_single.html'
      })


  }])

