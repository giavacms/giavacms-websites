'use strict';

angular.module('jsApp')

    .controller('Vota',
    ['$anchorScroll', '$interval', '$location', '$rootScope', '$scope', '$state', '$stateParams', '$window', 'APP_PROPERTIES', 'AuthenticationService', 'ChaletService', 'RsResource',
        function ($anchorScroll, $interval, $location, $rootScope, $scope, $state, $stateParams, $window, APP_PROPERTIES, AuthenticationService, ChaletService, RsResource) {

            // timer cleanup
            var cleanTimer = function () {
                if ($rootScope.timer) {
                    $interval.cancel($rootScope.timer);
                }
                $rootScope.timer = undefined;
            }
            // sempre al caricamento del controller
            cleanTimer();
            // sempre all'uscita dallo stato
            $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
                if (from.name == 'vota') {
                    cleanTimer();
                }
            });

            // oggetto di voto
            $scope.vote = {};
            // e variabili collegate
            $scope.errors = [];
            $scope.call = '';
            $scope.confirmed = false;
            $scope.firstTime = 'true';
            $scope.withToken = 'false';


            // licenseNumber might be in the stateParams
            if ($stateParams.licenseNumber) {
                $scope.vote.preference1 = $stateParams.licenseNumber;
            }

            // phone number might be in token
            var checkAlreadyLogged = function () {
                AuthenticationService.isLogged().then(function (success) {
                    $scope.withToken = success;
                    if (success) {
                        $scope.vote.phone = AuthenticationService.getUsername()
                        $scope.fullname = AuthenticationService.getFullname();
                        $scope.firstTime = 'false';
                    }
                });
            };
            checkAlreadyLogged();

            var errValues = {
                'ER1': 'il nome non puo\' essere vuoto.',
                'ER2': 'il cognome non puo\' essere vuoto.',
                'ER3': 'il numero di telefono non puo\' essere vuoto.',
                'ER4': 'puoi votare al massimo 3 volte al giorno.',
                'ER5': 'non ci risultano voti con il numero indicato.',
                'ER6': 'abbiamo dei problemi. riprova piu\' tardi.'
            };


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
                cleanTimer();
                $location.hash('top');
                $anchorScroll();
                checkAlreadyLogged();
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
                if ($scope.withToken) {
                    reqParams['id'] = 'withToken';
                }

                var checkConfirm = function (uuid) {
                    var reqParams = {};
                    reqParams['host'] = APP_PROPERTIES.HOST;
                    reqParams['entityPath'] = 'contest';
                    reqParams['id'] = uuid;
                    reqParams['entityPath2'] = 'confirmed';
                    return RsResource.get(reqParams, $scope.vote).$promise.then(
                        function confirmed(success) {
                            console.log(JSON.stringify(success));
                            if (success.msg == 'true') {
                                cleanTimer();
                                $scope.confirmed = true;
                                $scope.vote = {};
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        function unconfirmed(error) {
                            console.log(JSON.stringify(error));
                            return false;
                        });
                };

                RsResource.create(reqParams, $scope.vote,
                    function voteCreated(success) {
                        $location.hash('top');
                        $anchorScroll();
                        $scope.sent = true;
                        $scope.tocall = success.tocall;
                        console.log(JSON.stringify(success));
                        $scope.call = 'OK';
                        checkConfirm(success.uuid).then(function (immediatelyConfirmed) {
                            if (!immediatelyConfirmed) {
                                $rootScope.timer = $interval(function () {
                                    checkConfirm(success.uuid);
                                }, 2000);
                            }
                        });
                    },
                    function voteFailed(error) {
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
                title: 'Vota il tuo Chalet'
            })

            .state('votami', {
                url: '/vota/:licenseNumber',
                controller: 'Vota',
                templateUrl: 'views/vota.html',
                title: 'Vota il tuo Chalet'
            })

    }])
;
