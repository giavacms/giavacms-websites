'use strict';


angular.module('giavacms-private')


  .filter('newlines', function () {
    return function (text) {
      if (text)
        return text.replace(/\n/g, '<br/>');
      return '';
    }
  })

  .filter('htmlToPlaintext', function () {
    return function (text) {
      return String(text).replace(/<[^>]+>/gm, '');
    }
  })
