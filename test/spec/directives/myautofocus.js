'use strict';

describe('Directive: myAutofocus', function () {

  // load the directive's module
  beforeEach(module('eventAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-autofocus></my-autofocus>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myAutofocus directive');
  }));
});
