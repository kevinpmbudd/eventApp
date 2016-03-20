'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myNewEvent
 * @description
 * # myNewEvent
 */
angular.module('eventAppApp')
  .directive('myNewEvent', myNewEvent);


function myNewEvent() {
	var directive = {
    restrict: 'E',
    templateUrl: 'views/mynewevent.html',
    controller: myNewEventCtrl,
    bindToController: true
  };

  return directive;

  function myNewEventCtrl($scope, Ref, $firebaseArray, $timeout, $location) {

  	$scope.events = $firebaseArray(Ref.child('events'));
    $scope.users = $firebaseArray(Ref.child('users'));



    // $scope.place = {};
    // $scope.showPlaceDetails = function(param) {
    //   $scope.place = param;
    // }
    // uiGmapGoogleMapApi.then(function(maps) {
    //   maps.visualRefresh = true;
    //   $scope.defaultBounds = new google.maps.LatLngBounds(
    //     new google.maps.LatLng(40.82148, -73.66450),
    //     new google.maps.LatLng(40.66541, -74.31715));


    //   $scope.map.bounds = {
    //     northeast: {
    //       latitude:$scope.defaultBounds.getNorthEast().lat(),
    //       longitude:$scope.defaultBounds.getNorthEast().lng()
    //     },
    //     southwest: {
    //       latitude:$scope.defaultBounds.getSouthWest().lat(),
    //       longitude:-$scope.defaultBounds.getSouthWest().lng()

    //     }
    //   }
    //   $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
    // });

  //   angular.extend($scope, {
  //   window: {
  //     show: false,
  //     options: {
  //       pixelOffset: { width: 0, height: -40 }
  //     },
  //     templateurl:'window.tpl.html',
  //     templateparameter: {},
  //     closeClick: function () {
  //       $scope.window.show = false;
  //     }
  //   },
  //   map: {
  //     control: {},
  //     center: {
  //       latitude: 40.74349,
  //       longitude: -73.990822
  //     },
  //     zoom: 12,
  //     dragging: false,
  //     bounds: {},
  //     markers: [],
  //     idkey: 'place_id',
  //     events: {
  //       idle: function (map) {

  //       },
  //       dragend: function(map) {
  //         //update the search box bounds after dragging the map
  //         var bounds = map.getBounds();
  //         var ne = bounds.getNorthEast();
  //         var sw = bounds.getSouthWest();
  //         $scope.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
  //         //$scope.searchbox.options.visible = true;
  //       }
  //     }
  //   },
  //   searchbox: {
  //     template:'searchbox.tpl.html',
  //     options: {
  //       autocomplete:true,
  //       types: ['(cities)'],
  //       componentRestrictions: {country: 'us'}
  //     },
  //     events: {
  //       place_changed: function (autocomplete){

  //         $scope.place = autocomplete.getPlace()

  //         if ($scope.place.address_components) {

  //           newMarkers = [];
  //           var bounds = new google.maps.LatLngBounds();

  //           var marker = {
  //             idKey:$scope.place.place_id,
  //             place_id: $scope.place.place_id,
  //             name: $scope.place.address_components[0].long_name,
  //             latitude: $scope.place.geometry.location.lat(),
  //             longitude: $scope.place.geometry.location.lng(),
  //             templateurl:'window.tpl.html',
  //             templateparameter: $scope.place,
  //             events: {
  //               click: function (marker) {
  //                 $scope.window.coords = {
  //                   latitude: marker.model.latitude,
  //                   longitude: marker.model.longitude
  //                 }
  //                 $scope.window.templateparameter = marker.model.templateparameter;
  //                 $scope.window.show = true;

  //               }
  //             }
  //           };

  //           newMarkers.push(marker);

  //           bounds.extend($scope.place.geometry.location);

  //           $scope.map.bounds = {
  //             northeast: {
  //               latitude: bounds.getNorthEast().lat(),
  //               longitude: bounds.getNorthEast().lng()
  //             },
  //             southwest: {
  //               latitude: bounds.getSouthWest().lat(),
  //               longitude: bounds.getSouthWest().lng()
  //             }
  //           }

  //           $scope.map.markers = newMarkers;
  //         } else {
  //           console.log("do something else with the search string: " + $scope.place.name);
  //         }
  //       }
  //     }


  //   }
  // });

    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
    $scope.options = {scrollwheel: false};
    var events = {
      places_changed: function (autocomplete) {

      }
    }
    $scope.searchbox = {
      template:'searchbox.tpl.html',
      options: {
        autocomplete: true
      },
      events:events,
      position: 'top-left'
    };

  	$scope.addEvent = function(name, host, location) {
  		if( name && host && location ) {
  			$scope.events.$add({name: name, host: host, location: location})
        .then(function(ref) {
          var id = ref.key();
          console.log(id);
          console.log($scope.events.$indexFor(id));
        })
        .then(redirect, showError)
  			.catch(alert);
  		}

      console.log($scope.users);
      console.log($scope.events);
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
  }
}
