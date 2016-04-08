'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myGuestListRequired
 * @description
 * # myGuestListRequired
 */
angular.module('eventAppApp')
  .directive('myGuestListRequired', function() {

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$setValidity('hasGuests', false);

        ctrl.$formatters.unshift(function(value) {
          ctrl.$setValidity('hasGuests', scope.newEvent.guests.length !== 0);
        })
      }
    };
  });
