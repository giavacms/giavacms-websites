'use strict';


angular.module('giavacms-private')

    .controller('ProductController',
    ['$rootScope', '$scope', '$stateParams', '$state',
        'RsResource', 'popupService', 'SigleFileUploadService', 'NgTableParams',

        '$filter', '$location',
        'factoryItems', 'APP_PROPERTIES',
        function ($rootScope, $scope, $stateParams, $state, RsResource, popupService, SigleFileUploadService, NgTableParams,
                  $filter, $location, factoryItems, APP_PROPERTIES) {
            angular.extend(this, new BaseController($rootScope, $scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

            angular.extend(this, new AttachmentController($scope, $stateParams, SigleFileUploadService, RsResource, APP_PROPERTIES, this));


            $scope.listPage = 'products';
            $scope.newPage = 'product_new';
            $scope.entityPath = 'products';
            $scope.sortingArray = {data: 'desc'};

            $scope.getBaseSearch = function (search, reqParams) {
                if (search && search.like && search.like.name) {
                    console.log('name: ' + search.like.name);
                    reqParams['like.name'] = search.like.name;
                }
                if (search && search.obj && search.obj.category && search.obj.category.id) {
                    console.log('id: ' + search.obj.category.id);
                    reqParams['obj.category.id'] = search.obj.category.id;
                }
                reqParams['obj.language'] = 'ITA';
            };

            //inizializzo la lista dei productstype
            factoryItems.getCategories().then(function (result) {
                $scope.categories = result;
            });

            factoryItems.getFeatureItems().then(function (result) {
                $scope.featureItems = result;
            });


            // anche dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
            // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
            // ...e quindi...
            // funzione di callback. altre idee?
            $scope.getSuccess = function () {
                console.log(JSON.stringify($scope.element));
                $scope.initAttachments();
            };

            $scope.getFailure = function () {

            };
            $scope.init();


        }])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('product', {
                url: '/product',
                templateUrl: 'views/catalogue/product/list.html',
                ncyBreadcrumb: {
                    label: 'products',
                    parent: 'home'
                }
            })
            .state('product_new', {
                url: '/product/new',
                templateUrl: 'views/catalogue/product/edit.html',
                ncyBreadcrumb: {
                    label: 'new',
                    parent: 'product'
                }
            })
            .state('product_edit', {
                url: '/product/:id/edit',
                templateUrl: 'views/catalogue/product/edit.html',
                ncyBreadcrumb: {
                    label: 'edit',
                    parent: 'product'
                }
            })

            .state('product_images_edit', {
                url: '/product/:id/images/edit',
                templateUrl: 'views/catalogue/product/edit-images.html',
                ncyBreadcrumb: {
                    label: 'edit images',
                    parent: 'product'
                }
            })

            .state('product_documents_edit', {
                url: '/product/:id/documents/edit',
                templateUrl: 'views/catalogue/product/edit-documents.html',
                ncyBreadcrumb: {
                    label: 'edit documents',
                    parent: 'product'
                }
            })

            .state('product_view', {
                url: '/product/:id',
                templateUrl: 'views/catalogue/product/view.html',
                ncyBreadcrumb: {
                    label: 'detail',
                    parent: 'product'
                }
            })

    }])

;
