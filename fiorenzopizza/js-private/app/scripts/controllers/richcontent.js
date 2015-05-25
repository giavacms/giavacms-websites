'use strict';


angular.module('giavacms-private')

    .controller('RichcontentController',
    ['$rootScope', '$scope', '$stateParams', '$state',
        'RsResource', 'popupService', 'SigleFileUploadService', 'NgTableParams',

        '$filter', '$location',
        'factoryItems', 'APP_PROPERTIES',
        function ($rootScope, $scope, $stateParams, $state, RsResource, popupService, SigleFileUploadService, NgTableParams,
                  $filter, $location, factoryItems, APP_PROPERTIES) {
            angular.extend(this, new BaseController($rootScope, $scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, APP_PROPERTIES, this));

            angular.extend(this, new AttachmentController($scope, $stateParams, SigleFileUploadService, RsResource, APP_PROPERTIES, this));


            $scope.listPage = 'richcontent';
            $scope.newPage = 'richcontent_new';
            $scope.entityPath = 'richcontents';
            $scope.sortingArray = {data: 'desc'};

            $scope.getBaseSearch = function (search, reqParams) {
                if (search && search.like && search.like.title) {
                    console.log('title: ' + search.like.title);
                    reqParams['like.title'] = search.like.title;
                }
                if (search && search.obj && search.obj.richContentType && search.obj.richContentType.id) {
                    console.log('id: ' + search.obj.richContentType.id);
                    reqParams['obj.richContentType.id'] = search.obj.richContentType.id;
                }
                reqParams['obj.language'] = 'ITA';
            };

            //inizializzo la lista dei richcontenttype
            factoryItems.getRichcontenttypes().then(function (result) {
                $scope.richcontenttypes = result;
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
            .state('richcontent', {
                url: '/richcontent',
                templateUrl: 'views/richcontent/list.html',
                ncyBreadcrumb: {
                    label: 'Richcontent',
                    parent: 'home'
                }
            })
            .state('richcontent_new', {
                url: '/richcontent/new',
                templateUrl: 'views/richcontent/edit.html',
                ncyBreadcrumb: {
                    label: 'new',
                    parent: 'richcontent'
                }
            })
            .state('richcontent_edit', {
                url: '/richcontent/:id/edit',
                templateUrl: 'views/richcontent/edit.html',
                ncyBreadcrumb: {
                    label: 'edit',
                    parent: 'richcontent'
                }
            })

            .state('richcontent_images_edit', {
                url: '/richcontent/:id/images/edit',
                templateUrl: 'views/richcontent/edit-images.html',
                ncyBreadcrumb: {
                    label: 'edit images',
                    parent: 'richcontent'
                }
            })

            .state('richcontent_documents_edit', {
                url: '/richcontent/:id/documents/edit',
                templateUrl: 'views/richcontent/edit-documents.html',
                ncyBreadcrumb: {
                    label: 'edit documents',
                    parent: 'richcontent'
                }
            })

            .state('richcontent_view', {
                url: '/richcontent/:id',
                templateUrl: 'views/richcontent/view.html',
                ncyBreadcrumb: {
                    label: 'detail',
                    parent: 'richcontent'
                }
            })

    }])

;
