'use strict';


angular.module('giavacms-private')

    .controller('CategoryController',
    ['$rootScope', '$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams',
        '$filter', '$location',
        'factoryItems', 'APP_PROPERTIES',
        function ($rootScope, $scope, $stateParams, $state, RsResource, popupService, NgTableParams,
                  $filter, $location, factoryItems, APP_PROPERTIES) {
            angular.extend(this, new BaseController($rootScope, $scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

            $scope.listPage = 'category';
            $scope.newPage = 'category_new';
            $scope.entityPath = 'categories';
            $scope.sortingArray = {id: 'desc'};

            $scope.getBaseSearch = function (search, reqParams) {
                if (search && search.like && search.like.name) {
                    console.log('name: ' + search.like.name);
                    reqParams['like.name'] = search.like.name;
                }
                reqParams['obj.language'] = 'ITA';
            };


            factoryItems.getFeatures().then(function (result) {
                $scope.features = result;
            });

            // anche dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
            // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
            // ...e quindi...
            // funzione di callback. altre idee?
            $scope.getSuccess = function () {
                console.log(JSON.stringify($scope.element));
            };

            $scope.getFailure = function () {

            };
            $scope.init();
        }])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('category', {
                url: '/category',
                templateUrl: 'views/catalogue/category/list.html',
                ncyBreadcrumb: {
                    label: 'Category',
                    parent: 'home'
                }
            })

            .state('category_new', {
                url: '/category/new',
                templateUrl: 'views/catalogue/category/edit.html',
                ncyBreadcrumb: {
                    label: 'new',
                    parent: 'category'
                }
            })

            .state('category_edit', {
                url: '/category/:id/edit',
                templateUrl: 'views/catalogue/category/edit.html',
                ncyBreadcrumb: {
                    label: 'edit',
                    parent: 'category'
                }
            })

            .state('category_view', {
                url: '/category/:id',
                templateUrl: 'views/catalogue/category/view.html',
                ncyBreadcrumb: {
                    label: 'detail',
                    parent: 'category'
                }
            })

    }])

;
