'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('NeweventCtrl', function($scope, Ref, $firebaseArray, $timeout, $location, uiGmapGoogleMapApi) {
    $scope.events = $firebaseArray(Ref.child('events'));
    $scope.users = $firebaseArray(Ref.child('users'));
    $scope.guestList = [];

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
    //callback for guestlist autocomplete guest selector
    $scope.selectedPerson = function(guest) {
      console.log(guest);
      if (guest.length !== 0)
        $scope.guestList.push(guest.originalObject);
    };
    //clear the guest searchbox after a selection is made
    $scope.clearSelection = function(id) {
      if (id) {
        $scope.$broadcast('angucomplete-alt:clearInput', id);
      } else {
        $scope.$broadcast('angucomplete-alt:clearInput');
      }
    };
    //initialize google map with default options
    $scope.map = {
      control: {},
      center: {
        latitude: 39.85,
        longitude: -98.55
      },
      zoom: 3
    }
    //initialize a google maps marker with default options
    $scope.marker = {
    	id: 0,
      coords: {
        latitude: 0,
        longitude: 0
      }
    };

    var events = {
	    places_changed: function(searchBox) {
	    	//grab the selected item from the searchbox
			  var place = searchBox.getPlaces();
			  if (place.length == 0) {
			    return;
			  }
			  //re center the map on the selected location
			  $scope.map = {
			    "center": {
			      "latitude": place[0].geometry.location.lat(),
			      "longitude": place[0].geometry.location.lng()
			    },
			    "zoom": 18
			  };
			  //add marker on the selected spot
			  $scope.marker = {
			    id: 0,
			    coords: {
			      latitude: place[0].geometry.location.lat(),
			      longitude: place[0].geometry.location.lng()
			    }
			  };
			}
		};
		//initialize map searchbox with options
		$scope.searchbox = { template: 'searchbox.tpl.html', events: events, parentdiv: 'eventLocation' };

		//add new event to firebase
    $scope.addEvent = function(name, host, location) {
      if (name && host && location) {
        $scope.events.$add({ name: name, host: host, location: location, guests: $scope.guestList })
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