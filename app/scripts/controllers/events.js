'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('EventsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
