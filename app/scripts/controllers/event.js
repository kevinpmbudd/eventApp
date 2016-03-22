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

  	//initialize google map with default options
    $scope.map = {
      control: {},
      center: {
        latitude: 39.85,
        longitude: -98.55
      },
      zoom: 3
    };

    console.log($scope.event);

    // initialize a google maps marker with default options
    // $scope.marker = {
    // 	id: 0,
    //   coords: {
    //     latitude: $scope.event.location.latitude,
    //     longitude: $scope.event.location.longitude
    //   }
    // };

  });
