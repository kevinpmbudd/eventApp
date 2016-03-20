'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('EventsCtrl', function ($scope, Ref, $firebaseArray) {
    $scope.events = $firebaseArray(Ref.child('events'));

    $scope.events.$loaded().then(function(events) {
    	events.forEach(function(event) {
    		console.log(event);
    	});
    });
  });
