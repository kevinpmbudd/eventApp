'use strict';

/**
 * @ngdoc service
 * @name eventAppApp.myEvents
 * @description
 * # myEvents
 * Factory in the eventAppApp.
 */
angular.module('eventAppApp')
  .factory('myEvents', function (Ref, $firebaseArray, $firebaseObject) {

    //create an events firebaseArray that dependencies of this service will receive
    var events = {};

    events.list = $firebaseArray(Ref.child('events'));

    events.add = function(event) {
      events.list.$add({
        name: event.name,
        host: event.host,
        type: event.type,
        startDate: event.startDate.getTime(),
        endDate: event.endDate.getTime(),
        location: event.location,
        guests: event.guests
      });
    };

    events.retrieve = function(id) {
      return $firebaseObject(Ref.child('events/'+ id));
    };

    // Public API here
    return events;
  });
