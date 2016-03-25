'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('EventCtrl', function ($scope, $routeParams, myEvents) {
  	$scope.event = myEvents.retrieve($routeParams.id);

  	$scope.event.$loaded()
  	.then(function(data) {
  		$scope.map = {
  			center: {
  				latitude: data.location.latitude,
  				longitude: data.location.longitude
  			},
  			zoom: 17
  		};
	  	$scope.map.marker = {
  			id: 0,
  			coords: {
  				latitude: data.location.latitude,
  				longitude: data.location.longitude
  			}
  		};
  	});
  });
