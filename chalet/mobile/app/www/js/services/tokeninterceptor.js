'use strict';


angular.module('votalatuaestate')

    .config(['jwtInterceptorProvider','$httpProvider', function (jwtInterceptorProvider, $httpProvider) {

        jwtInterceptorProvider.tokenGetter = function (StorageService) {
            return StorageService.get('token');
            //return "nn" ;
        }

        $httpProvider.interceptors.push('jwtInterceptor');
    }])

;
