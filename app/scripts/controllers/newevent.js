'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('NeweventCtrl', function ($scope, Ref, $firebaseArray, $timeout, $location) {
  	$scope.events = $firebaseArray(Ref.child('events'));
    $scope.users = $firebaseArray(Ref.child('users'));
    $scope.guestList = [];

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

    $scope.addGuest = function(guest) {
      $scope.guestList.push(guest);
    };

    $scope.clearSelection = function(id) {
    	if (id) {
        $scope.$broadcast('angucomplete-alt:clearInput', id);
      }
      else{
        $scope.$broadcast('angucomplete-alt:clearInput');
      }
    };

    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
    $scope.options = {scrollwheel: false};
    var events = {
      places_changed: function (searchBox) {

      }
    }
    $scope.searchbox = {
      template:'searchbox.tpl.html',
      options: {
        autocomplete: true,
        types: ['establishment']
      },
      events:events,
      parentdiv: 'eventLocation'
      // position: 'top-left'

    };

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
