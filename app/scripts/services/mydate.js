'use strict';

/**
 * @ngdoc service
 * @name eventAppApp.myDate
 * @description
 * # myDate
 * Factory in the eventAppApp.
 */
angular.module('eventAppApp')
  .factory('myDate', function () {

    return {
      dateToObject: function (date) {

        var dateObj = {
          year:  date.getFullYear(),
          month: date.getMonth() + 1,
          day:   date.getDate()
        };

        return dateObj;
      },
      objectToDate: function (obj) {

        var date = new Date(obj.year, obj.month - 1 , obj.day);

        return date;
      }
    };
  });
