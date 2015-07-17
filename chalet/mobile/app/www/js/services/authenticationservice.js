'use strict';


angular.module('votalatuaestate')

    .factory('AuthenticationService', ['$rootScope', '$http', 'jwtHelper', 'StorageService', '$q', '$timeout', 'PROTOCOL', 'HOST', 'CONTEXT', '$log',
        function ($rootScope, $http, jwtHelper, StorageService, $q, $timeout, PROTOCOL, HOST, CONTEXT, $log) {

            var protocol = PROTOCOL;
            var host = HOST;
            var context = CONTEXT;

            StorageService.get('info').then(
                function (info) {
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
            );

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
                            tokenPayload = jwtHelper.decodeToken(token);
                            logged = true;
                        }
                        else {
                            logged = false;
                        }
                        return logged;
                    });
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


                login: function (user) {
                    var url = protocol + '://' + host + '/' + context + '/api/v1/utenti';
                    $http.post(url, {
                        username: user.username,
                        password: user.password
                    }).success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $log.debug(data);
                        token = data.token;
                        tokenPayload = jwtHelper.decodeToken(data.token);
                        logged = true;
                        var storedToken = [];
                        storedToken.push(token);
                        StorageService.set('token', storedToken);
                        $rootScope.$broadcast('loginConfirmed', status);
                    }).error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $log.debug(data);
                        $rootScope.$broadcast('login-failed');
                    });
                },
                logout: function (user) {
                    logged = false;
                    token = {};
                    tokenPayload = {};
                    StorageService.set('token', '').then(function () {
                        $rootScope.$broadcast('logout-complete');
                    });
                    //StorageService.set('token', []);

                },
                loginCancelled: function () {
                    $rootScope.$broadcast('login-failed');
                }
            };
            return service;
        }])

;
