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

        var checkForGuests = function(value) {
          var contains;
          if(scope.newEvent.guests.length > 0) {
            contains = true;
          }
          else {
            contains = false;
          }

          return contains;
        };

        ctrl.$setValidity('hasGuests', false);

        // $('.new-guest-btn').on('click', function() {
        //   console.log(element, scope, attrs, ctrl);
        //   if (scope.newEvent.guest.length !== 0) {
        //     ctrl.$setValidity('hasGuests', true);
        //   }
        // });
        ctrl.$parsers.unshift(function(viewValue) {
          var haveGuests = checkForGuests(viewValue);

          ctrl.$setValidity('hasGuests', haveGuests);

          if(haveGuests) {
            return viewValue;
          } else {
            return undefined;
          }
        });
      }
    };
  });
