'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myContainsCharacter
 * @description
 * # myContainsCharacter
 */
angular.module('eventAppApp')
  .directive('myContainsCharacter', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the myContainsCharacter directive');
      }
    };
  });