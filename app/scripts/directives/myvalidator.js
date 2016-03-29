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
  		console.log(value);
  		if(value.match(/[a-z]/i))
        return true;
  	};

  	var number = function(value) {
  		if(value.match(/\d/g))
  		  return true;
  	};

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {

        ctrl.$parsers.unshift(function(viewValue) {
        	var containsLetter = letter(viewValue);
        	var containsNumber = number(viewValue);

        	ctrl.$setValidity('containsLetter', containsLetter);
        	ctrl.$setValidity('containsNumber', containsNumber);

        	if(containsLetter && containsNumber) {
        		return viewValue;
        	} else {
        		return undefined;
        	}
        });
      }
    };
  });