'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myValidator
 * @description
 * # myValidator
 */
angular.module('eventAppApp')
  .directive('myValidator', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the myValidator directive');
      }
    };
  });