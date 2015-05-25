'use strict';


function AttachmentController($scope, $stateParams, SigleFileUploadService, RsResource, APP_PROPERTIES, controller) {


    $scope.initAttachments = function () {
        if ($stateParams.id !== undefined) {
            $scope.loadImages();
            $scope.loadDocuments();

            $scope.images = [];
            $scope.documents = [];

            $scope.imageUrl = 'http://' + APP_PROPERTIES.HOST +
            APP_PROPERTIES.CONTEXT + '/api/v1/' + $scope.entityPath + "/" + $stateParams.id + "/images";

            $scope.documentUrl = 'http://' + APP_PROPERTIES.HOST +
            APP_PROPERTIES.CONTEXT + '/api/v1/' + $scope.entityPath + "/" + $stateParams.id + "/documents";

        }
    }


    $scope.addImage = function () {
        var img = {};
        $scope.images.push(img);
    }

    $scope.addDocument = function () {
        var doc = {};
        $scope.documents.push(doc);
    }

    $scope.uploadImages = function () {
        for (var i = 0; i < $scope.images.length; i++) {
            SigleFileUploadService.uploadFileToUrl($scope.imageUrl, $scope.images[i]);
            //$scope.images.splice(i, 1);
        }
        $scope.loadImages();
    }

    $scope.uploadDocuments = function () {
        for (var i = 0; i < $scope.documents.length; i++) {
            SigleFileUploadService.uploadFileToUrl($scope.documentUrl, $scope.documents[i]);
            //$scope.documents.splice(i, 1);
        }
        $scope.loadDocuments();
    }


    $scope.deleteImage = function (imageId) {
        for (var i = 0; i < $scope.element.images.length; i++) {
            if ($scope.element.images[i].id == imageId) {
                $scope.element.images.splice(i, 1);
                break;
            }
        }
        var reqParams = {};
        reqParams['host'] = APP_PROPERTIES.HOST;
        reqParams['entityPath'] = $scope.entityPath;
        reqParams['id'] = $scope.element.id;
        reqParams['entityPath2'] = 'images';
        reqParams['id2'] = imageId;
        RsResource.delete(reqParams, function (response) {
            console.log(response);
        });
    }

    $scope.deleteDocument = function (documentId) {
        for (var i = 0; i < $scope.element.documents.length; i++) {
            if ($scope.element.documents[i].id == documentId) {
                $scope.element.documents.splice(i, 1);
                break;
            }
        }
        var reqParams = {};
        reqParams['host'] = APP_PROPERTIES.HOST;
        reqParams['entityPath'] = $scope.entityPath;
        reqParams['id'] = $scope.element.id;
        reqParams['entityPath2'] = 'documents';
        reqParams['id2'] = documentId;
        RsResource.delete(reqParams, function (response) {
            console.log(response);
        });
    }

    $scope.modifyImage = function (documentId) {

    }

    $scope.modifyDocument = function (documentId) {

    }


    $scope.loadImages = function () {
        //$scope.element, $scope.entityPath, $stateParams.id, APP_PROPERTIES.HOST
        var reqParams = {};
        reqParams['host'] = APP_PROPERTIES.HOST;
        reqParams['entityPath'] = $scope.entityPath;
        reqParams['id'] = $scope.element.id;
        reqParams['entityPath2'] = 'images';
        RsResource.query(reqParams, function (images) {
            $scope.element.images = images;
        });
    }

    $scope.loadDocuments = function () {
        var reqParams = {};
        reqParams['host'] = APP_PROPERTIES.HOST;
        reqParams['entityPath'] = $scope.entityPath;
        reqParams['id'] = $scope.element.id;
        reqParams['entityPath2'] = 'documents';
        RsResource.query(reqParams, function (documents) {
            $scope.element.documents = documents;
        });
    }

}
