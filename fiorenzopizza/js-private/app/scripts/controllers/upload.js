/**
 * Created by fiorenzo on 11/05/15.
 */

angular.module('giavacms-private')

  .service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl, name, description) {
      var fd = new FormData();
      fd.append("name", name);
      fd.append("description", description);
      fd.append('file', file);
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

  .controller('myCtrl', ['$scope', 'fileUpload', function ($scope, fileUpload) {

    $scope.uploadFile = function () {
      var file = $scope.myFile;
      console.log('file is ' + JSON.stringify(file));
      var uploadUrl = "http://localhost:8080/api/v1/richcontent/1-agosto-ore-2130--le-marche-i-manicomi-i-matti-gli-amori/image";
      fileUpload.uploadFileToUrl(file, uploadUrl, $scope.name, $scope.description);
    };

  }]);
