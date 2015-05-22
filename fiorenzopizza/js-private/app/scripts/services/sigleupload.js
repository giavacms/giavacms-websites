angular.module('giavacms-private')

    .service('SigleFileUploadService', ['$http', function ($http) {
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
    }]);