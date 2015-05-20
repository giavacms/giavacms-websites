'use strict';


angular.module('giavacms-private')


  .directive('formatMyDate', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attr, ngModel) {

        var isDate = function (input) {
          console.log("isDate");
          try {
            if ((!angular.isDefined(input)) || (input === null)) {
              console.log("Erreur : date is empty");
              return false;
            } else if (Object.prototype.toString.call(input) === "[object Date]") {
              if (isNaN(input.getTime())) {
                console.log("Erreur : date is not valid : " + input);
                return false;
              } else {
                console.log("isDate true");
                return true;
              }
            } else {
              console.log("Erreur : not a date : " + input);
              return false;
            }
          } catch (err) {
            console.log("Erreur : " + err + " on " + input);
            return false;
          }
        };

        var formatDate = function (dateIn) {
          console.log("formatDate");
          try {
            if ((angular.isDefined(dateIn)) && (dateIn !== null)) {
              var madate = new Date(parseInt(dateIn));
              if (isDate(madate)) {
                console.log("formatDate > isDate true");
                var yyyy = madate.getFullYear();
                var mm = madate.getMonth() + 1;
                if (mm < 10) mm = "0" + mm;
                var dd = madate.getDate();
                if (dd < 10) dd = "0" + dd;
                return dd + "/" + mm + "/" + yyyy;
              } else {
                console.log("formatDate > isDate false");
                return "";
              }
            } else {
              console.log("formatDate > dateIn not defined");
              return "";
            }
          } catch (err) {
            console.log("Erreur : " + err);
            return "";
          }
        };

        var parseDate = function (input) {
          console.log("parseDate");
          try {
            var parts = input.split('/');
            var tmpDate = new Date(parts[2], parts[1] - 1, parts[0]);
            if (isDate(tmpDate)) {
              console.log("parseDate > isDate true");
              return tmpDate.getTime();
            } else {
              console.log("parseDate > isDate false");
              return null;
            }
          } catch (err) {
            console.log("Erreur : " + err + " on " + input);
            return null;
          }
        };
        var fromUser = function (text) {
          // view to model
          var tmpResult = parseDate(text);
          console.log("view to model / date to milli" + text + " -> " + tmpResult);
          return tmpResult;
        };
        var toUser = function (text) {
          // model to view
          var tmpResult = formatDate(text);
          console.log("model to view / milli to date : " + text + " -> " + tmpResult);
          return tmpResult;
        };
        ngModel.$parsers.push(fromUser);
        ngModel.$formatters.push(toUser);
      }
    };
  });
