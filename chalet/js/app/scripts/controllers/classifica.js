'use strict';

angular.module('jsApp')

  .controller('Classifica', ['$scope', 'ClassificaService', function ($scope, ClassificaService) {
    ClassificaService.getLast(function (element) {
      $scope.element = element;
    })
  }])


  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('classifica', {
        url: '/classifica',
        controller: 'Classifica',
        templateUrl: 'views/classifica.html',
        ncyBreadcrumb: {
          label: 'classifica'
        }
      })

  }])

