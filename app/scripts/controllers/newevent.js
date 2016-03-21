'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('NeweventCtrl', function ($scope, Ref, $firebaseArray, $timeout, $location, uiGmapGoogleMapApi) {
  	$scope.events = $firebaseArray(Ref.child('events'));
    $scope.users = $firebaseArray(Ref.child('users'));
    $scope.guestList = [];
    // map searchbox
    $scope.place = {};
    $scope.showPlaceDetails = function(param) {
	    $scope.place = param;
	  }
	  uiGmapGoogleMapApi.then(function(maps) {
	  	maps.visualRefresh = true;
	    // $scope.defaultBounds = new google.maps.LatLngBounds(
	    //   new google.maps.LatLng(40.82148, -73.66450),
	    //   new google.maps.LatLng(40.66541, -74.31715));

	    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 3 };

	    // $scope.map.bounds = {
	    //   northeast: {
	    //     latitude:$scope.defaultBounds.getNorthEast().lat(),
	    //     longitude:$scope.defaultBounds.getNorthEast().lng()
	    //   },
	    //   southwest: {
	    //     latitude:$scope.defaultBounds.getSouthWest().lat(),
	    //     longitude:-$scope.defaultBounds.getSouthWest().lng()
	    //   }
	    // }
	    // $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
	  });


    // Autocomplete searchbox to add guests to guest list
    $scope.localSearch = function(str) {
      var matches = [];
      $scope.users.forEach(function(person) {
        var fullName = person.fname + ' ' + person.lname;
        if ((person.fname.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
            (person.lname.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
            (fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
          matches.push(person);
        }
      });
      return matches;
    };

    $scope.selectedPerson = function(guest) {
    	console.log(guest);
    	if(guest.length !== 0)
      	$scope.guestList.push(guest.originalObject);
    };

    $scope.clearSelection = function(id) {
    	if (id) {
        $scope.$broadcast('angucomplete-alt:clearInput', id);
      }
      else{
        $scope.$broadcast('angucomplete-alt:clearInput');
      }
    };

    // $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
    // $scope.options = {scrollwheel: false};
    // var events = {
    //   places_changed: function (searchBox) {

    //   }
    // }
    // $scope.searchbox = {
    //   template:'searchbox.tpl.html',
    //   options: {
    //     autocomplete: true,
    //     types: ['establishment']
    //   },
    //   events:events,
    //   parentdiv: 'eventLocation'
    //   // position: 'top-left'

    // };
    $scope.searchbox = {
      template:'searchbox.tpl.html',
      options: {
        bounds: {},
        autocomplete: true,
        types: ['establishment']
      },
      parentdiv:'eventLocation',
      events: {
        places_changed: function (searchBox) {

          // $scope.places = searchBox.getPlaces()

          // if (places.length == 0) {
          //   return;
          // }
          // // For each place, get the icon, place name, and location.
          // newMarkers = [];
          // var bounds = new google.maps.LatLngBounds();
          // for (var i = 0, place; place = $scope.places[i]; i++) {
          //   // Create a marker for each place.
          //   var marker = {
          //     idKey:i,
          //     place_id: place.place_id,
          //     name: place.name,
          //     latitude: place.geometry.location.lat(),
          //     longitude: place.geometry.location.lng(),
          //     templateurl:'window.tpl.html',
          //     templateparameter: place,
          //     events: {
          //       click: function (marker) {
          //         $scope.window.coords = {
          //           latitude: marker.model.latitude,
          //           longitude: marker.model.longitude
          //         }
          //         $scope.window.templateparameter = marker.model.templateparameter;
          //         $scope.window.show = true;

          //       }
          //     }
          //   };
          //   newMarkers.push(marker);

          //   bounds.extend(place.geometry.location);
          // }

          // $scope.map.bounds = {
          //   northeast: {
          //     latitude: bounds.getNorthEast().lat(),
          //     longitude: bounds.getNorthEast().lng()
          //   },
          //   southwest: {
          //     latitude: bounds.getSouthWest().lat(),
          //     longitude: bounds.getSouthWest().lng()
          //   }
          // }

          // $scope.map.markers = newMarkers;
        }
      }
    }

  	$scope.addEvent = function(name, host, location) {
  		if( name && host && location ) {
  			$scope.events.$add({name: name, host: host, location: location, guests: $scope.guestList})
        .then(redirect, showError)
  			.catch(alert);
  		}
  		$scope.guestList = [];
  	};

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
