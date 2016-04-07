'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myGuestListRequired
 * @description
 * # myGuestListRequired
 */
angular.module('eventAppApp')
  .directive('myGuestListRequired', function () {
    return {
      restrict: 'A',
      require: '^ngModel',
      link: function (scope, element, attrs, ctrl) {

        ctrl.$setValidity('hasGuests', false);

        $('.new-guest-btn').on('click', function() {
          console.log(scope);
          if(scope.newEvent.guest.length !== 0){
            ctrl.$setValidity('hasGuests', true);
          }
        });
      }
    };
  });