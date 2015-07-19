'use strict';


angular.module('votalatuaestate')

    .factory('AuthenticationService', ['$rootScope', '$http', 'jwtHelper', 'StorageService', '$q', '$interval',
        'APP_PROPERTIES', '$log',
        function ($rootScope, $http, jwtHelper, StorageService, $q, $interval, APP_PROPERTIES, $log) {

            var protocol = APP_PROPERTIES.PROTOCOL;
            var host = APP_PROPERTIES.HOST;
            var context = APP_PROPERTIES.CONTEXT;

            StorageService.get('info').then(
                function (info) {
                    if (info[0]) {
                        if (info[0].host) {
                            host = info[0].host;
                        }
                        if (info[0].context) {
                            context = info[0].context;
                        }
                        if (info[0].protocol) {
                            protocol = info[0].protocol;
                        }
                    }
                }
            );

            var tocall;
            var uuid;

            var logged;
            var tokenPayload = {};
            var token = {};

            var service = {

                isLogged: function () {
                    if (logged) {
                        return $q.when(logged);
                    }

                    return StorageService.get('token').then(function (storedToken) {
                        if (storedToken && storedToken.length > 0) {
                            token = storedToken[0];
                            if (token) {
                                tokenPayload = jwtHelper.decodeToken(token);
                                logged = true;
                            } else {
                                logged = false;
                            }
                        }
                        else {
                            logged = false;
                        }
                        return logged;
                    });
                },

                getTocall: function () {
                    return tocall;
                },
                getUuid: function () {
                    return uuid;
                },
                getToken: function () {
                    return token;
                },
                getFullname: function () {
                    return tokenPayload.name;
                },
                getUsername: function () {
                    return tokenPayload.username;
                },
                getExpiryDate: function () {
                    return tokenPayload.exp;
                },
                getRoles: function () {
                    return tokenPayload.roles ? tokenPayload.roles : [];
                },

                register: function (phone, name, surname) {
                    var url = protocol + '://' + host + '/api/v1/accounts';
                    $http.post(url, {
                        phone: phone,
                        name: name,
                        surname: surname
                    }).success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $log.debug(data);
                        tocall = data.tocall;
                        uuid = data.uuid;
                        logged = false;
                        var storedToken = [];
                        storedToken.push(token);
                        StorageService.set('token', storedToken);
                        $rootScope.$broadcast('registration-unconfirmed', status);
                    }).error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $log.debug(data);
                        $rootScope.$broadcast('registration-failed');
                    });
                },

                login: function (phone) {
                    var url = protocol + '://' + host + '/api/v1/accounts/login';
                    $http.post(url, {
                        phone: phone
                    }).success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $log.debug(data);
                        uuid = data.uuid;
                        tocall = data.tocall;
                        logged = false;
                        var storedToken = [];
                        storedToken.push(token);
                        StorageService.set('token', storedToken);
                        $rootScope.$broadcast('login-unconfirmed', status);
                    }).error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $log.debug(data);
                        $rootScope.$broadcast('login-failed');
                    });
                },


                confirm: function () {
                    var url = protocol + '://' + host + '/api/v1/accounts/login/' + uuid + '/token';
                    $http.get(url).success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $log.debug(data);
                        token = data.token;
                        tokenPayload = jwtHelper.decodeToken(data.token);
                        logged = true;
                        var storedToken = [];
                        storedToken.push(token);
                        StorageService.set('token', storedToken);
                        $rootScope.$broadcast('login-confirmed', status);
                    }).error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $log.debug(data);
                    });
                },

                logout: function () {
                    logged = false;
                    token = {};
                    tokenPayload = {};
                    StorageService.set('token', '').then(function () {
                        $rootScope.$broadcast('logout-complete');
                    });
                    //StorageService.set('token', []);

                }

            };

            return service;
        }])

;
