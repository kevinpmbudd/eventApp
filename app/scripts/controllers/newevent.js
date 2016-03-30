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
    //$scope.events = myEvents.list;
    $scope.newEvent = {};

    $scope.addEvent = function(event) {
      console.log(event);
      myEvents.add(event);
      redirect();
    };

    $scope.users = $firebaseArray(Ref.child('users'));
    $scope.newEvent.guests = [];

    $scope.addGuest = function(guest) {
      $scope.newEvent.guests.push(guest);
      $scope.newEvent.guest = '';
    };

    var autocomplete;

    var updateMarker = function() {
      $scope.newEvent.location = {
        latitude: autocomplete.getPlace().geometry.location.lat(),
        longitude: autocomplete.getPlace().geometry.location.lng()
      };
    };

    uiGmapGoogleMapApi.then(function(maps) {
      var input = document.getElementById('search-box');
      var options = {};

      autocomplete = new maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', updateMarker);
    });



    //initialize google map with default options
    // $scope.map = {
    //   control: {},
    //   center: {
    //     latitude: 39.85,
    //     longitude: -98.55
    //   },
    //   zoom: 3
    // };
    // //initialize a google maps marker with default options
    // $scope.marker = {
    //   id: 0,
    //   coords: {
    //     latitude: 0,
    //     longitude: 0
    //   }
    // };

    // var events = {
    //   places_changed: function(searchBox) {
    //     //grab the selected item from the searchbox
    //     var place = searchBox.getPlaces();
    //     if (place.length === 0) {
    //       return;
    //     }
    //     //re center the map on the selected location
    //     $scope.map = {
    //       center: {
    //         latitude: place[0].geometry.location.lat(),
    //         longitude: place[0].geometry.location.lng()
    //       },
    //       zoom: 18
    //     };
    //     //add marker on the selected spot
    //     $scope.marker = {
    //       id: 0,
    //       coords: {
    //         latitude: place[0].geometry.location.lat(),
    //         longitude: place[0].geometry.location.lng()
    //       }
    //     };

    //     $scope.newEvent.location = {
    //       latitude: place[0].geometry.location.lat(),
    //       longitude: place[0].geometry.location.lng()
    //     };
    //   }
    // };
    // //initialize map searchbox with options
    // $scope.searchbox = { template: 'searchbox.tpl.html', events: events, parentdiv: 'eventLocation' };

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

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    $scope.setMinDate = function() {
      $scope.dateOptions.minDate = $scope.newEvent.startDateTime;
    };

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

  });
