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

  function myNewEventCtrl($scope, Ref, $firebaseArray, $timeout) {

  	$scope.events = $firebaseArray(Ref.child('events'));

  	$scope.addEvent = function(name, host, location) {
  		if( name && host && location ) {
  			$scope.events.$add({name: name, host: host, location: location})
  			.catch(alert);
  		}
  	};

  	function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  }
}
