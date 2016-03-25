'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('NeweventCtrl', function($scope, Ref, $firebaseArray, $timeout, $location, myEvents) {
    //$scope.events = myEvents.list;
    $scope.newEvent = {};

    $scope.addEvent = function(event) {
      console.log(event);
      myEvents.add(event);
    };

    $scope.users = $firebaseArray(Ref.child('users'));
    $scope.newEvent.guests = [];
    // var location;

    $scope.addGuest = function(guest) {
      // console.log(guest);
      $scope.newEvent.guests.push(guest);
      console.log($scope.newEvent.guests);
      $scope.eventGuest = '';
      console.log($scope.events);
    };

    //initialize google map with default options
    $scope.map = {
      control: {},
      center: {
        latitude: 39.85,
        longitude: -98.55
      },
      zoom: 3
    };
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
        if (place.length === 0) {
          return;
        }
        //re center the map on the selected location
        $scope.map = {
          center: {
            latitude: place[0].geometry.location.lat(),
            longitude: place[0].geometry.location.lng()
          },
          zoom: 18
        };
        //add marker on the selected spot
        $scope.marker = {
          id: 0,
          coords: {
            latitude: place[0].geometry.location.lat(),
            longitude: place[0].geometry.location.lng()
          }
        };

        $scope.newEvent.location = {
          latitude: place[0].geometry.location.lat(),
          longitude: place[0].geometry.location.lng()
        };
      }
    };
    //initialize map searchbox with options
    $scope.searchbox = { template: 'searchbox.tpl.html', events: events, parentdiv: 'eventLocation' };

    // $scope.addEvent = function(name, host) {
    //   if (name && host) {
    //     $scope.events.$add({
    //       name: name,
    //       host: host,
    //       type: $scope.eventType,
    //       startDate: myDate.dateToObject($scope.startDate),
    //       endDate: myDate.dateToObject($scope.endDate),
    //       location: location,
    //       guests: $scope.guestList })
    //       .then(redirect, showError)
    //       .catch(alert);
    //   }
    //   $scope.guestList = [];
    // };

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

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    // $scope.inlineOptions = {
    //   customClass: getDayClass,
    //   minDate: new Date(),
    //   showWeeks: true
    // };

    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.startTime = new Date();
    $scope.endTime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours(14);
      d.setMinutes(0);
      $scope.mytime = d;
    };

    $scope.changed = function() {
      // $log.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };

  });
