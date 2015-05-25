/**
 * Created by fiorenzo on 11/05/15.
 */

angular.module('giavacms-private')

    .controller('UploadController', ['$scope', 'fileUpload', function ($scope, fileUpload) {

        $scope.uploadFile = function () {
            console.log('file is ' + JSON.stringify(file));
            var uploadUrl = "http://localhost:8080/api/v1/richcontents/1-agosto-ore-2130--le-marche-i-manicomi-i-matti-gli-amori/images";
            var fileObj = {};
            fileObj.name = $scope.name;
            fileObj.description = $scope.description;
            fileObj.file = $scope.myFile;
            fileUpload.uploadFileToUrl(uploadUrl, fileObj);
        };

    }]);
