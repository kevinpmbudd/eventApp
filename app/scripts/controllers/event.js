'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('EventCtrl', function ($scope, Ref, $firebaseObject, $routeParams) {
  	$scope.event = $firebaseObject(Ref.child('events/'+ $routeParams.id));
  	// $scope.map = {
  	// 		center: {
  	// 			latitude: 39.85,
  	// 			longitude: -98.55
  	// 		},
  	// 		zoom: 3
  	// };
  	// $scope.map.marker = {
  	// 		id: 0,
  	// 		coords: {
  	// 			latitude: 0,
  	// 			longitude: 0
  	// 		}
  	// };

  	$scope.event.$loaded()
  	.then(function(data) {
  		$scope.map = {
  			center: {
  				latitude: data.location.latitude,
  				longitude: data.location.longitude
  			},
  			zoom: 17
  		}
	  	$scope.map.marker = {
  			id: 0,
  			coords: {
  				latitude: data.location.latitude,
  				longitude: data.location.longitude
  			}
  		};
  	});
  });
