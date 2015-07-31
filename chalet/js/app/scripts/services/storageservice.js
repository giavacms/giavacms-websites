'use strict';

angular.module('jsApp')

  .service('StorageService', ['localStorageService', '$rootScope', '$q', '$timeout', '$log',
    function (localStorageService, $rootScope, $q, $timeout, $log) {

      var boundObjects = {};

      var get = function (entityType) {
        return $q.when(boundObjects).then(
          function () {
            var mapped = boundObjects[entityType];
            if (mapped == null || angular.isUndefined(mapped)) {
              mapped = [];
              localStorageService.bind($rootScope, entityType, mapped);
              boundObjects[entityType] = mapped;
            }
            return mapped;
          }
        );
      }


      var reset = function (entityType) {
        return get(entityType).then(
          function (mapped) {
            while (mapped && mapped.length > 0) {
              mapped.pop();
            }
            $log.debug('reset:' + entityType);
            return $q.when(true);
          }
        );
      }

      var getAll = function () {
        /*
         var deferred = $q.defer();
         $timeout(function () {
         deferred.resolve(boundObjects);
         }, 0);
         return deferred.promise;
         */
        return $q.when(boundObjects);
      }

      var set = function (entityType, list) {
        return get(entityType).then(
          function (mapped) {
            var tmp = [];
            for (var l = 0; l < list.length; l++) {
              tmp.push(list[l]);
            }
//                    var mapped = boundObjects[entityType];
            while (mapped && mapped.length > 0) {
              mapped.pop();
            }
            for (var t = 0; t < tmp.length; t++) {
              mapped.push(tmp[t]);
            }
            return true;
          }
        );

      }

      return {
        get: get,
        reset: reset,
        getAll: getAll,
        set: set
      }
    }
  ]);
