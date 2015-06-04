/**
 * Created by fiorenzo on 11/05/15.
 */

angular.module('giavacms-private')

    .controller('ResourcesController',
    ['RsResource', 'APP_PROPERTIES', '$stateParams', '$state', '$scope',
        function (RsResource, APP_PROPERTIES, $stateParams, $state, $scope) {

            $scope.previuous = {};
            $scope.folder = "/";
            $scope.loadResources = function (folder) {
                $scope.previuous = $scope.folder;
                $scope.folder = folder;
                $scope.ok = false;
                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = 'resources';
                if (folder !== '') {
                    reqParams['id'] = folder;
                }
                RsResource.query(reqParams, function (data) {
                    $scope.resources = data;
                });
            };

            $scope.edit = function (resource) {
                $scope.ok = true;

                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = 'resources';
                reqParams['id'] = resource.folder;
                reqParams['entityPath2'] = 'files';
                reqParams['id2'] = resource.name;
                RsResource.get(reqParams, function (data) {
                    $scope.resource = data;
                });
            }

            $scope.update = function () {
                $scope.ok = false;
                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = 'resources';
                reqParams['id'] = $scope.resource.folder;
                reqParams['entityPath2'] = 'files';
                reqParams['id2'] = $scope.resource.name;
                RsResource.update(reqParams, $scope.resource, function () {
                });

            }

            $scope.delete = function () {
                $scope.ok = false;
                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = 'resources';
                reqParams['id'] = $scope.resource.folder;
                reqParams['entityPath2'] = 'files';
                reqParams['id2'] = $scope.resource.name;
                RsResource.delete(reqParams, $scope.resource, function () {

                });
                $scope.loadResources();

            }

            $scope.ok = false;
            $scope.loadResources('');

        }])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('resources', {
                url: '/resources',
                templateUrl: 'views/resources/list.html',
                ncyBreadcrumb: {
                    label: 'Resources',
                    parent: 'home'
                }
            })

    }]);
