'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myValidator
 * @description
 * # myValidator
 */
angular.module('eventAppApp')
  .directive('myValidator', function () {

  	var letter = function(value) {
      var contains;
  		if(value.match(/[a-z]/i)) {
        contains = true;
      }
      else {
        contains = false;
      }

      return contains;
  	};

  	var number = function(value) {
      var contains;
  		if(value.match(/\d/g)) {
        contains = true;
      } else {
        contains = false;
      }

      return contains;
  	};

    var length = function(value) {
      var isLong;
      if(value.length > 7) {
        isLong = true;
      } else {
        isLong = false;
      }

      return isLong;
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {

        ctrl.$setValidity('containsLetter', false);
        ctrl.$setValidity('containsNumber', false);
        ctrl.$setValidity('longEnough', false);

        ctrl.$parsers.unshift(function(viewValue) {
        	var hasLetter = letter(viewValue);
        	var hasNumber = number(viewValue);
          var hasLength = length(viewValue);

        	ctrl.$setValidity('containsLetter', hasLetter);
        	ctrl.$setValidity('containsNumber', hasNumber);
          ctrl.$setValidity('longEnough', hasLength);

        	if(hasLetter && hasNumber && hasLength) {
        		return viewValue;
        	} else {
        		return undefined;
        	}
        });
      }
    };
  });