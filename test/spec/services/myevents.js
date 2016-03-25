'use strict';

describe('Service: myEvents', function () {

  // load the service's module
  beforeEach(module('eventAppApp'));

  // instantiate service
  var myEvents;
  beforeEach(inject(function (_myEvents_) {
    myEvents = _myEvents_;
  }));

  it('should do something', function () {
    expect(!!myEvents).toBe(true);
  });

});
