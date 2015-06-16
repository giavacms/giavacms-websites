'use strict';

angular.module('jsApp')

    .controller('ExhibitionsController',
    ['$scope', 'RsResource', '$stateParams', '$state',
        function ($scope, RsResource, $stateParams, $state) {

            $scope.startRow = 0;
            $scope.pageSize = 0;
            $scope.listSize = 0;


            var host = 'localhost:8080';
            var entityPath = 'exhibitions';


            var list = function () {
                $scope.exhibitions = {};
                var reqParams = {};
                reqParams['host'] = host;
                reqParams['entityPath'] = entityPath;
                reqParams['startRow'] = 0;
                reqParams['pageSize'] = 10;
                RsResource.query(reqParams, function (data) {
                    $scope.exhibitions = data;
                });
            }

            var view = function (startRow) {
                var reqParams = {};
                reqParams['host'] = host;
                reqParams['entityPath'] = entityPath;
                reqParams['id'] = $stateParams.id;
                var res = RsResource.get(reqParams);
                res.$promise.then(function (value) {
                    $scope.element = value;
                    console.log(value);
                    return res.$promise;
                }).then(function (value) {
                    var reqParams = {};
                    reqParams['host'] = host;
                    reqParams['entityPath'] = entityPath;
                    reqParams['id'] = $stateParams.id;
                    reqParams['entityPath2'] = 'participations';
                    if ($state.params.artistName !== undefined) {
                        reqParams['artistName'] = $state.params.artistName;
                    }
                    if ($state.params.discipline !== undefined) {
                        reqParams['discipline'] = $state.params.discipline;
                    }
                    if (startRow < 0) {
                        reqParams['startRow'] = 0;
                    } else if ((startRow >= 0) && (startRow <= $scope.listSize)) {
                        reqParams['startRow'] = startRow;
                    } else if (startRow > $scope.listSize) {
                        reqParams['startRow'] = $scope.listSize;
                    } else {
                        reqParams['startRow'] = 0;
                    }
                    //reqParams['startRow'] = 0;
                    reqParams['pageSize'] = 10;
                    res = RsResource.query(reqParams, function (data, headers) {
                        $scope.startRow = headers('startRow');
                        $scope.pageSize = headers('pageSize');
                        $scope.listSize = headers('listSize');

                        console.log('startRow: ' + headers('startRow'));
                        console.log('pageSize: ' + headers('pageSize'));
                        console.log('listSize: ' + headers('listSize'));
                    });
                    return res.$promise;
                }).then(function (value) {
                    $scope.partecipations = value;
                    var reqParams = {};
                    reqParams['host'] = host;
                    reqParams['entityPath'] = entityPath;
                    reqParams['id'] = $stateParams.id;
                    reqParams['entityPath2'] = 'disciplines';
                    res = RsResource.query(reqParams);
                    return res.$promise;
                }).then(function (value) {
                    //http://localhost:8080/api/v1/exhibitions/arte-insieme-2015/disciplines
                    $scope.disciplines = value;

                    var sum = 0;
                    angular.forEach(value, function (v, k) {
                        console.log(k + ': ' + v.participants);
                        sum += v.participants;
                    });
                    $scope.disciplines.push({'name': 'tutti', 'participants': sum});
                })
                    .catch(function (err) {
                        console.error(err);
                    });
            }


            if ($stateParams.id !== undefined) {
                view(0);
            } else {
                list();
            }

            $scope.next = function () {
                view(parseInt($scope.startRow) + parseInt($scope.pageSize));
            }

            $scope.previous = function () {
                view(parseInt($scope.startRow) - parseInt($scope.pageSize));
            }

            $scope.isNext = function () {
                var sum = parseInt($scope.startRow) + parseInt($scope.pageSize);
                console.log('sum: ' + sum);
                return (sum > 0) && (sum < $scope.listSize);
            }

            $scope.isPrevious = function () {
                var diff = parseInt($scope.startRow) - parseInt($scope.pageSize);
                console.log('diff: ' + diff);
                return (diff > 0) && (diff < $scope.listSize);
            }


        }])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('exhibitions', {
                url: '/exhibitions',
                templateUrl: 'views/exhibitions/list.html',
                ncyBreadcrumb: {
                    label: 'exhibitions'
                }
            })

            .state('exhibitions_view', {
                url: '/exhibitions/:id?discipline&artistName',
                templateUrl: 'views/exhibitions/view.html',
                ncyBreadcrumb: {
                    label: 'detail',
                    parent: 'exhibitions'
                }
            })


    }])
;
