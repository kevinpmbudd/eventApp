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

    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
    $scope.options = {scrollwheel: false};
    var events = {
      places_changed: function (searchBox) {}
    }
    $scope.searchbox = {
      template:'searchbox.tpl.html',
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
