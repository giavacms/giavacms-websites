'use strict';


function AttachmentController($scope, $stateParams, SigleFileUploadService, RsResource, APP_PROPERTIES, controller) {


    $scope.initAttachments = function () {
        if ($stateParams.id !== undefined) {
            $scope.loadImages($scope.element, $scope.entityType, $stateParams.id, APP_PROPERTIES.HOST);
            $scope.loadDocuments($scope.element, $scope.entityType, $stateParams.id, APP_PROPERTIES.HOST);

            $scope.images = [];
            $scope.documents = [];

            $scope.imageUrl = 'http://' + APP_PROPERTIES.HOST +
            APP_PROPERTIES.CONTEXT + '/api/v1/' + $scope.entityType + "/" + $stateParams.id + "/image";

            $scope.documentUrl = 'http://' + APP_PROPERTIES.HOST +
            APP_PROPERTIES.CONTEXT + '/api/v1/' + $scope.entityType + "/" + $stateParams.id + "/document";

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
        }
        $scope.images = [];
    }

    $scope.uploadDocuments = function () {
        for (var i = 0; i < $scope.documents.length; i++) {
            SigleFileUploadService.uploadFileToUrl($scope.documentUrl, $scope.documents[i]);
        }
        $scope.documents = [];
    }


    $scope.deleteImage = function (imageId) {
        var reqParams = {};
        reqParams['host'] = APP_PROPERTIES.HOST;
        reqParams['entityType'] = $scope.entityType;
        reqParams['id'] = $scope.element.id;
        reqParams['entityType2'] = 'image';
        reqParams['id2'] = imageId;
        RsResource.delete(reqParams, function (response) {
            console.log(response);
        });
    }

    $scope.deleteDocument = function (documentId) {
        var reqParams = {};
        reqParams['host'] = APP_PROPERTIES.HOST;
        reqParams['entityType'] = $scope.entityType;
        reqParams['id'] = $scope.element.id;
        reqParams['entityType2'] = 'document';
        reqParams['id2'] = documentId;
        RsResource.delete(reqParams, function (response) {
            console.log(response);
        });
    }

    $scope.modifyImage = function (documentId) {

    }

    $scope.modifyDocument = function (documentId) {

    }


    $scope.loadImages = function (element, entityType, id, host) {
        var reqParams = {};
        reqParams['host'] = host;
        reqParams['entityType'] = entityType;
        reqParams['id'] = id;
        reqParams['entityType2'] = 'images';
        RsResource.query(reqParams, function (images) {
            element.images = images;
        });
    }

    $scope.loadDocuments = function (element, entityType, id, host) {
        var reqParams = {};
        reqParams['host'] = host;
        reqParams['entityType'] = entityType;
        reqParams['id'] = id;
        reqParams['entityType2'] = 'documents';
        RsResource.query(reqParams, function (documents) {
            element.documents = documents;
        });
    }

}
