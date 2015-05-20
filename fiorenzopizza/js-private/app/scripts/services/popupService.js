'use strict';


angular.module('giavacms-private')

  .service('popupService', function ($window) {
    this.showPopup = function (message) {
      return $window.confirm(message);
    }
  });
