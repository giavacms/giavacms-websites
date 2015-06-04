/**
 * Created by fiorenzo on 11/05/15.
 */

angular.module('giavacms-private')

    .controller('ContestController',
    ['RsResource', 'APP_PROPERTIES', '$stateParams', '$state', '$scope',
        function (RsResource, APP_PROPERTIES, $stateParams, $state, $scope) {

            $scope.send = function () {
                $scope.ok = false;
                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = 'contest';
                RsResource.create(reqParams, $scope.vote, $scope.getSuccess, $scope.getFailure);
                $scope.getSuccess = function (success) {
                    console.log(JSON.stringify(success));
                }
                $scope.getFailure = function (error) {
                    console.log(JSON.stringify(error));
                }

            }


        }])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('contest', {
                url: '/contest',
                templateUrl: 'views/contest/list.html',
                ncyBreadcrumb: {
                    label: 'Contest',
                    parent: 'home'
                }
            })

    }]);
