'use strict';

describe('Directive: myValidator', function () {

  // load the directive's module
  beforeEach(module('eventAppApp'));

  var element,
    $scope,
    form;

  beforeEach(inject(function ($compile, $rootScope) {
    $scope = $rootScope.$new();
    element = angular.element(
      '<form name="form"><input type="password" id="accountPass" class="form-control"'
      + ' placeholder="Password" ng-model="accountPass"'
      + ' name="pass" my-validator required></form>'
    );
    $scope.model = { accountPass: null };
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));

  describe("containsNumber", function() {

    it('should be defined and initially set valid to false', function() {
      expect(form.pass.$error.containsNumber.$valid).toBeFalsy();
    });

    it('should be set to invalid if user enters a password with no numbers' , function() {
      form.pass.$setViewValue("ABCDEFGH");
      console.log($scope);
      $scope.digest();
      expect(form.pass.$error.containsNumber.$valid).toBeFalsy();
    });

    it('should be false when the user has entered at least one number in the password', function() {
      form.pass.$setViewValue("1ABCDEFG");
      $scope.digest();
      expect(form.pass.$error.containsNumber).toBeFalsy();
    });
  });
});
