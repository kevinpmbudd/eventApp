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
        startDateTime: event.startDateTime.getTime(),
        endDateTime: event.endDateTime.getTime(),
        location: event.location,
        guests: event.guests,
        message: event.message || ""
      });
    };

    events.retrieve = function(id) {
      return $firebaseObject(Ref.child('events/'+ id));
    };

    // Public API here
    return events;
  });
