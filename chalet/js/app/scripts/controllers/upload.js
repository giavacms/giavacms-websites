'use strict';

/**
 * @ngdoc function
 * @name jsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsApp
 */
angular.module('jsApp')

    .controller('Upload', ['$log', '$scope', '$state', 'APP_PROPERTIES', 'AuthenticationService', 'ChaletService', 'SingleFileUploadService',
        function ($log, $scope, $state, APP_PROPERTIES, AuthenticationService, ChaletService, SingleFileUploadService) {

            // change this to true when login succeeds
            AuthenticationService.isLogged().then(function (success) {
                if (!success) {
                    $state.go('login');
                }
                else {
                    $scope.phone = AuthenticationService.getUsername()
                    $scope.fullname = AuthenticationService.getFullname();
                    $state.current.title = 'Carica le tue foto';
                }
            });

            ChaletService.getList(0, 0, 200).then(function (data) {
                $scope.chalets = data;
            });

            $scope.image = {};
            $scope.upload = {done: false, ok: false, sending: false};

            $scope.reset = function () {
                $scope.image = {};
                $scope.upload = {done: false, ok: false, sending: false};
                $scope.upload.chaletId = {};
            }

            $scope.uploadImage = function () {
                $scope.upload.done = false;
                $scope.upload.ok = false;
                $scope.upload.sending = true;
                $log.debug('file is ' + JSON.stringify($scope.image));
                var uploadUrl = '//' + APP_PROPERTIES.HOST + '/api/v1/photos/chalet/' + $scope.upload.chaletId;
                SingleFileUploadService.uploadFileToUrl(uploadUrl, $scope.image).then(
                    function ok() {
                        $scope.upload.done = true;
                        $scope.upload.ok = true;
                        $scope.image = {};
                        $scope.upload.sending = false;
                    },
                    function error() {
                        $scope.upload.done = true;
                        $scope.upload.ok = false;
                        $scope.image = {};
                        $scope.upload.sending = false;
                    });
            }

            //$scope.uploadFile = function () {
            //  $log.debug('file is ' + JSON.stringify($scope.upload.image));
            //
            //  var fileObj = {};
            //  fileObj.name = $scope.upload.chaletId + '_' + $scope.upload.image.name;
            //  fileObj.description = 'Uploaded by ' + $scope.fullname + ' on ' + new Date().toString();
            //  fileObj.file = $scope.upload.image.file;
            //  SingleFileUploadService.uploadFileToUrl(uploadUrl, fileObj);
            //};

        }])

    .
    config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('upload', {
                url: '/profilo/upload',
                controller: 'Upload',
                templateUrl: 'views/carica-le-foto.html',
                title: 'Carica le tue foto'
            })

    }]);
