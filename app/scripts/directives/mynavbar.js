'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myNavbar
 * @description
 * # myNavbar
 */
angular.module('eventAppApp')
  .directive('myNavbar', function () {
    return {
      template: '../../views/mynavbar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the myNavbar directive');
      }
    };
  });