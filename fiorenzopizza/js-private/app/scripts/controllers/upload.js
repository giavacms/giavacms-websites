/**
 * Created by fiorenzo on 11/05/15.
 */

angular.module('giavacms-private')

    .service('siglefileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (uploadUrl, fileObj) {
            var fd = new FormData();
            angular.forEach(fileObj, function (key, value) {
                fd.append(key, value);
            });
            //fd.append("name", name);
            //fd.append("description", description);
            //fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function () {
                })
                .error(function () {
                });
        }
    }])

    .controller('UploadController', ['$scope', 'fileUpload', function ($scope, fileUpload) {

        $scope.uploadFile = function () {
            console.log('file is ' + JSON.stringify(file));
            var uploadUrl = "http://localhost:8080/api/v1/richcontent/1-agosto-ore-2130--le-marche-i-manicomi-i-matti-gli-amori/image";
            var fileObj = {};
            fileObj.name = $scope.name;
            fileObj.description = $scope.description;
            fileObj.file = $scope.myFile;
            fileUpload.uploadFileToUrl(uploadUrl, fileObj);
        };

    }]);
