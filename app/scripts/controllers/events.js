'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('EventsCtrl', function ($scope, myEvents) {
    $scope.events = myEvents.list;

    $scope.events.$loaded()
    .then(function(data) {
    	console.log(data);
    	$scope.events.forEach(function(event) {
    		console.log(event);
    		console.log(typeof event.startDateTime);
    	});
    });
  });
