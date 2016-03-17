'use strict';

describe('Directive: myNewEvent', function () {

  // load the directive's module
  beforeEach(module('eventAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-new-event></my-new-event>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myNewEvent directive');
  }));
});
