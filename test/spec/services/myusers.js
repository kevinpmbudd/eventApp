'use strict';

describe('Service: myUsers', function () {

  // load the service's module
  beforeEach(module('eventAppApp'));

  // instantiate service
  var myUsers;
  beforeEach(inject(function (_myUsers_) {
    myUsers = _myUsers_;
  }));

  it('should do something', function () {
    expect(!!myUsers).toBe(true);
  });

});
