angular.module('giavacms-private')

    .service('SigleFileUploadService', ['$http', function ($http) {
        this.uploadFileToUrl = function (uploadUrl, fileObj) {
            var fd = new FormData();
            angular.forEach(fileObj, function (value, key) {
                fd.append(key, value);
            });
            //fd.append("name", name);
            //fd.append("description", description);
            //fd.append('file', file);
            var res = $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
            res.success(function (data, status, headers, config) {
                console.log(JSON.stringify(data));
            });
            res.error(function (data, status, headers, config) {
                console.log(JSON.stringify(data));
            });
        }
    }]);