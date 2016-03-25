'use strict';

/**
 * @ngdoc service
 * @name eventAppApp.myEvents
 * @description
 * # myEvents
 * Factory in the eventAppApp.
 */
angular.module('eventAppApp')
  .factory('myEvents', function (Ref, $firebaseArray, myDate) {

    //create an events firebaseArray that dependencies of this service will receive
    var events = {};

    events.list = $firebaseArray(Ref.child('events'));

    events.add = function(event) {
      events.list.$add({
        name: event.name,
        host: event.host,
        type: event.type,
        startDate: myDate.dateToObject(event.startDate),
        endDate: myDate.dateToObject(event.endDate),
        location: event.location,
        guests: event.guestList
      });
    };

    // Public API here
    return events;
  });
