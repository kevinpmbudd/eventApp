'use strict';

describe('Directive: myGuestListRequired', function () {

  // load the directive's module
  beforeEach(module('eventAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-guest-list-required></my-guest-list-required>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myGuestListRequired directive');
  }));
});
