'use strict';

/**
 * @ngdoc service
 * @name eventAppApp.myUsers
 * @description
 * # myUsers
 * Factory in the eventAppApp.
 */
angular.module('eventAppApp')
  .factory('myUsers', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
