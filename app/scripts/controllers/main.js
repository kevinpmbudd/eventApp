'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });