angular.module('jsApp')

  .service('SingleFileUploadService', ['$http', function ($http) {
    this.uploadFileToUrl = function (uploadUrl, fileObj) {
      var fd = new FormData();
      angular.forEach(fileObj, function (value, key) {
        fd.append(key, value);
      });
      //fd.append("name", name);
      //fd.append("description", description);
      //fd.append('file', file);
      var promise = $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
      /*
       promise.success(function (data, status, headers, config) {
       console.log(JSON.stringify(data));
       });
       promise.error(function (data, status, headers, config) {
       console.log(JSON.stringify(data));
       });
       */
      return promise;
    }
  }]);
