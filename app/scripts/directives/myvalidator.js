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
  		var doesContainLetter = value.match(/[a-z]/i);
  		// console.log(doesContainLetter);
  		return doesContainLetter;
  	};
  	var number = function(value) {
  		var doesContainNumber = value.match(/\d/g);
  		return doesContainNumber;
  	};

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {

        ctrl.$parsers.unshift(function(viewValue) {
        	var containsLetter = letter(viewValue);
        	var containsNumber = number(viewValue);
        	// console.log(containsLetter);
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