'use strict';


function UploadController($scope, SigleFileUploadService, controller) {

    $scope.singleupload = function (relativeUrl, fileObj) {
        //var uploadUrl = "http://localhost:8080/api/v1/richcontent/1-agosto-ore-2130--le-marche-i-manicomi-i-matti-gli-amori/image";
        var uploadUrl = $scope.getImageUrl();
        var fileObj = $scope.getImageObj();
        SigleFileUploadService.uploadFileToUrl(uploadUrl, fileObj);
    }

}
