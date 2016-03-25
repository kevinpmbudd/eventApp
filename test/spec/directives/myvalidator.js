'use strict';

describe('Directive: myValidator', function () {

  // load the directive's module
  beforeEach(module('eventAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($scompile, $rootScope) {
    $scope = $rootScope.$new();
    element = angular.element(
      '<form name="form><input type="password" id="accountPass" class="form-control"'
      + 'placeholder="Password" ng-model="accountPass" ng-minlength="8"'
      + 'name="accountPass" my-validator required></form>'
    );
    $scope.model = { accountPass: null };
    $compile(element)(scope);
    scope.$digest();
    form = $scope.form;
  }));

  describe("containsNumber", function() {

    it('should be defined and initially set valid to false', function() {
      expect(form.$error.containsNumber.$valid).toBeFalsy();
    });
  });

});
