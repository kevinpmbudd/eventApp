'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myNoInvalidCharacters
 * @description
 * # myNoInvalidCharacters
 */
angular.module('eventAppApp')
  .directive('myNoInvalidCharacters', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the myNoInvalidCharacters directive');
      }
    };
  });