'use strict';

angular.module('jsApp')

    .controller('Vota',
    ['ChaletService', 'RsResource', 'APP_PROPERTIES', '$stateParams', '$state', '$scope', '$interval', '$location', '$anchorScroll', '$window', '$rootScope',
        function (ChaletService, RsResource, APP_PROPERTIES, $stateParams, $state, $scope, $interval, $location, $anchorScroll, $window, $rootScope) {

            if (!$rootScope.timer) {
                $interval.cancel($rootScope.timer);
                $rootScope.timer = undefined;
            } else {
                $rootScope.timer = {};
            }


            $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
                if (from.name == 'vota' && $rootScope.timer) {
                    $interval.cancel($rootScope.timer);
                    $rootScope.timer = undefined;
                }
            });


            $scope.vote = {};
            if ($stateParams.licenseNumber) {
                $scope.vote.preference1 = $stateParams.licenseNumber;
            }

            var errValues = {
                'ER1': 'il nome non puo\' essere vuoto.',
                'ER2': 'il cognome non puo\' essere vuoto.',
                'ER3': 'il numero di telefono non puo\' essere vuoto.',
                'ER4': 'puoi votare al massimo 3 volte al giorno.',
                'ER5': 'non ci risultano voti con il numero indicato.',
                'ER6': 'abbiamo dei problemi. riprova piu\' tardi.'
            };


            $scope.errors = [];
            $scope.call = '';
            $scope.confirmed = false;
            $scope.firstTime = 'true';

            //ChaletService.getList(0, 0, 100, function (data) {
            //  $scope.chalets = data;
            //});

            ChaletService.getList(0, 0, 200).then(function (data) {
                $scope.chalets = data;
            });

            $scope.voteFor = function (licenseNumber) {
                $scope.vote.preference1 = licenseNumber;
            };


            $scope.reset = function () {
                if ($window.ga) {
                    $window.ga('send', 'event', 'vote', 'reset', $scope.vote.preference1);
                }
                $scope.errors = [];
                $scope.call = '';
                $scope.confirmed = false;
                $scope.vote = {};
                $scope.sent = false;
                if ($rootScope.timer) {
                    $interval.cancel($rootScope.timer);
                    $rootScope.timer = undefined;
                }
                $location.hash('top');
                $anchorScroll();
            }


            $scope.send = function () {
                $scope.errors = [];
                $scope.call = '';
                $scope.confirmed = false;
                if (($scope.firstTime === 'true') && (angular.isUndefined($scope.vote.name) || angular.isUndefined($scope.vote.surname) || angular.isUndefined($scope.vote.phone))) {
                    $scope.errors.push('devi inserire nome, cognome e numero di telefono');
                }
                if (($scope.firstTime === 'false') && angular.isUndefined($scope.vote.phone)) {
                    $scope.errors.push('devi inserire numero di telefono');
                }
                if (angular.isUndefined($scope.vote.preference1) || $scope.vote.preference1 == '' || $scope.vote.preference1 == null) {
                    $scope.errors.push('non hai specificato la preferenza');
                }
                if (($scope.firstTime === 'true') && (angular.isUndefined($scope.privacy) || ($scope.privacy != '1'))) {
                    $scope.errors.push('devi accettare la privacy');
                }
                if ($scope.errors.length > 0) {
                    return;
                }
                if ($window.ga) {
                    $window.ga('send', 'event', 'vote', 'send', $scope.vote.preference1);
                }

                var reqParams = {};
                reqParams['host'] = APP_PROPERTIES.HOST;
                reqParams['entityPath'] = 'contest';
                if ($scope.firstTime == 'false') {
                    reqParams['id'] = 'reVote';
                }
                RsResource.create(reqParams, $scope.vote, function (success) {
                    $location.hash('top');
                    $anchorScroll();

                    $scope.sent = true;
                    $scope.tocall = success.tocall;
                    console.log(JSON.stringify(success));
                    $scope.call = 'OK';
                    $rootScope.timer = $interval(function () {
                        var reqParams = {};
                        reqParams['host'] = APP_PROPERTIES.HOST;
                        reqParams['entityPath'] = 'contest';
                        reqParams['id'] = success.uuid;
                        reqParams['entityPath2'] = 'confirmed';
                        RsResource.get(reqParams, $scope.vote, function (success) {
                            console.log(JSON.stringify(success));
                            if (success.msg == 'true') {
                                $interval.cancel($rootScope.timer);
                                $rootScope.timer = undefined;
                                $scope.confirmed = true;
                                $scope.vote = {};
                            }

                        }, function (error) {
                            console.log(JSON.stringify(error));
                        });
                    }, 2000);

                }, function (error) {
                    console.log(error);
                    if (error.data && error.data.msg) {
                        angular.forEach(errValues, function (value, key) {
                            if (error.data.msg.indexOf(key) != -1) {
                                $scope.errors.push(value);
                            }
                        });
                    }
                });

            }


        }])


    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('vota', {
                url: '/vota',
                controller: 'Vota',
                templateUrl: 'views/vota.html',
                title: 'Vota'
            })

            .state('votami', {
                url: '/vota/:licenseNumber',
                controller: 'Vota',
                templateUrl: 'views/vota.html',
                title: 'Vota'
            })

    }])
;
