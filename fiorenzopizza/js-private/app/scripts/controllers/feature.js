'use strict';


angular.module('giavacms-private')

    .controller('FeatureController',
    ['$rootScope', '$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location', 'APP_PROPERTIES',
        function ($rootScope, $scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location, APP_PROPERTIES) {
            angular.extend(this, new BaseController($rootScope, $scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

            $scope.listPage = 'feature';
            $scope.newPage = 'feature';
            $scope.entityPath = 'features';
            $scope.sortingArray = {name: 'desc'};

            $scope.getBaseSearch = function (search, reqParams) {
                if (search && search.obj && search.obj.name) {
                    console.log('name: ' + search.obj.name);
                    reqParams['obj.name'] = search.obj.name;
                }
                reqParams['obj.language'] = 'ITA';
            };


            // anche dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
            // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
            // ...e quindi...
            // funzione di callback. altre idee?
            $scope.getSuccess = function () {

                console.log('element: ' + $scope.element);
            };

            $scope.getFailure = function () {

            };
            $scope.init();
        }])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('feature', {
                url: '/feature',
                templateUrl: 'views/catalogue/feature/list.html',
                ncyBreadcrumb: {
                    label: 'Feature',
                    parent: 'home'
                }
            })

    }]);
