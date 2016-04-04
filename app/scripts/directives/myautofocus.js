'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myAutofocus
 * @description
 * # myAutofocus
 */
angular.module('eventAppApp')
  .directive('myAutofocus', function ($timeout) {
    return {
      restrict: 'A',
	    link : function($scope, $element) {
	      $timeout(function() {
	        $element[0].focus();
	      });
	    }
    };
  });