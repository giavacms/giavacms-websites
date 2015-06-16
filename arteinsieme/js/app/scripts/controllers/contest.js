/**
 * Created by fiorenzo on 11/05/15.
 */

angular.module('jsApp')

    .controller('ContestController',
    ['RsResource', 'APP_PROPERTIES', '$stateParams', '$state', '$scope', '$interval',
        function (RsResource, APP_PROPERTIES, $stateParams, $state, $scope, $interval) {
            var errValues = {
                'ER1': 'il nome non puo\' essere vuoto.',
                'ER2': 'il cognome non puo\' essere vuoto.',
                'ER3': 'il numero di telefono non puo\' essere vuoto.',
                'ER4': 'esiste gia\' un voto con stesso numero di telefono, nome, cognome.',
                'ER5': 'esiste gia\' un voto con stesso numero di telefono.'
            };

            var timer = {};

            $scope.vote = {};
            $scope.errors = [];
            $scope.call = '';
            $scope.confirmed = false;

            $scope.reset = function () {
                $scope.errors = [];
                $scope.call = '';
                $scope.confirmed = false;
                $scope.vote = {};
                if (timer) {
                    $interval.cancel(timer);
                    timer = undefined;
                }
            }
            $scope.send = function () {
                $scope.errors = [];
                $scope.call = '';
                $scope.confirmed = false;
                if (angular.isUndefined($scope.vote.name) || angular.isUndefined($scope.vote.surname) || angular.isUndefined($scope.vote.phone)) {
                    $scope.errors.push('devi inserire nome, cognome e numero di telefono');
                }
                if (angular.isUndefined($scope.vote.picture) && angular.isUndefined($scope.vote.sculpture) && angular.isUndefined($scope.vote.photo)) {
                    $scope.errors.push('devi inserire almeno una preferenza per una disciplina');
                }
                if ($scope.errors.length > 0) {
                    return;
                }

                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = 'contest';
                RsResource.create(reqParams, $scope.vote, function (success) {
                    console.log(JSON.stringify(success));
                    $scope.call = 'OK';
                    timer = $interval(function () {
                        var reqParams = {};
                        reqParams['host'] = APP_PROPERTIES.HOST;
                        reqParams['entityPath'] = 'contest';
                        reqParams['id'] = $scope.vote.phone;
                        reqParams['entityPath2'] = 'confirmed';
                        RsResource.get(reqParams, $scope.vote, function (success) {
                            console.log(JSON.stringify(success));
                            if (success.msg == 'true') {
                                $interval.cancel(timer);
                                timer = undefined;
                                $scope.confirmed = true;
                                $scope.vote = {};
                            }

                        }, function (error) {
                            console.log(JSON.stringify(error));
                        });
                    }, 10000);

                }, function (error) {
                    console.log(error.data.msg);
                    angular.forEach(errValues, function (value, key) {
                        if (error.data.msg.indexOf(key) != -1) {
                            $scope.errors.push(value);
                        }
                    });
                });


            }


        }]);
