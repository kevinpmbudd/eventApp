'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myContainsNumber
 * @description
 * # myContainsNumber
 */
angular.module('eventAppApp')
  .directive('myContainsNumber', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$validators.myContainsNumber = function(modelValue, viewValue) {
        	if(ctrl.$isEmpty(modelValue)) {
        		return true;
        	}

        	if(NUMBER_REGEXP.test(viewValue)) {
        		console.log(viewValue);
        		console.log(ctrl);
        		return true;
        	}

        	return false;
        };
      }
    };
  });