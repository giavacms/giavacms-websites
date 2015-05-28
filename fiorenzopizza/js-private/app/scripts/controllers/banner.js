'use strict';


angular.module('giavacms-private')

    .controller('BannerController',
    ['$rootScope', '$scope', '$stateParams', '$state', 'RsResource', 'popupService',
        'SigleFileUploadService', 'NgTableParams',
        '$filter', '$location',
        'factoryItems', 'APP_PROPERTIES',
        function ($rootScope, $scope, $stateParams, $state, RsResource, popupService, SigleFileUploadService, NgTableParams,
                  $filter, $location, factoryItems, APP_PROPERTIES) {
            angular.extend(this, new BaseController($rootScope, $scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

            angular.extend(this, new AttachmentController($scope, $stateParams, SigleFileUploadService, RsResource, APP_PROPERTIES, this));


            $scope.listPage = 'banner';
            $scope.newPage = 'banner_new';
            $scope.entityPath = 'banners';
            $scope.sortingArray = {id: 'desc'};

            $scope.getBaseSearch = function (search, reqParams) {
                if (search && search.like && search.like.name) {
                    console.log('name: ' + search.like.name);
                    reqParams['like.name'] = search.like.name;
                }
                if (search && search.obj && search.obj.bannerType && search.obj.bannerType.id) {
                    console.log('bannerType.id: ' + search.obj.bannerType.id);
                    reqParams['obj.bannerType.id'] = search.obj.bannerType.id;
                }
                reqParams['obj.language'] = 'ITA';
            };

            //inizializzo la lista dei bannerTypology
            factoryItems.getBannertypes().then(function (result) {
                $scope.bannertypes = result;
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
            .state('banner', {
                url: '/banner',
                templateUrl: 'views/banner/list.html',
                ncyBreadcrumb: {
                    label: 'Banner',
                    parent: 'home'
                }
            })

            .state('banner_new', {
                url: '/banner/new',
                templateUrl: 'views/banner/edit.html',
                ncyBreadcrumb: {
                    label: 'new',
                    parent: 'banner'
                }
            })

            .state('banner_edit', {
                url: '/banner/:id/edit',
                templateUrl: 'views/banner/edit.html',
                ncyBreadcrumb: {
                    label: 'edit',
                    parent: 'banner'
                }
            })

            .state('banner_view', {
                url: '/banner/:id',
                templateUrl: 'views/banner/view.html',
                ncyBreadcrumb: {
                    label: 'detail',
                    parent: 'banner'
                }
            })

    }])

;
