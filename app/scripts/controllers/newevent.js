'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('NeweventCtrl', function($scope, Ref, $firebaseArray, $timeout, $location, myEvents, uiGmapGoogleMapApi) {
    $scope.newEvent = {};

    $scope.addEvent = function(event) {
      myEvents.add(event);
      redirect();
    };

    $scope.users = $firebaseArray(Ref.child('users'));
    $scope.newEvent.guests = [];


    $scope.addGuest = function(guest) {
      if (guest) {
        $scope.newEvent.guests.push(guest);
        $scope.newEvent.guest = '';
      }
    };

    //google maps api places library autocomplete location search box
    var autocomplete;

    var updateMarker = function() {
      $scope.newEvent.location = {
        latitude: autocomplete.getPlace().geometry.location.lat(),
        longitude: autocomplete.getPlace().geometry.location.lng(),
        name: autocomplete.getPlace().name,
        address: autocomplete.getPlace().formatted_address
      };

    };

    uiGmapGoogleMapApi.then(function(maps) {
      var input = document.getElementById('search-box');
      var options = {};

      autocomplete = new maps.places.Autocomplete(input, options);

      autocomplete.addListener('place_changed', updateMarker);
    });

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    function redirect() {
      $location.path('/events');
    }

    function showError(err) {
      $scope.err = err;
    }
  });