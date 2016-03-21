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
  });
