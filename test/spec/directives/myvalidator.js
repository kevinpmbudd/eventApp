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
      '<form name="form><input type="password" id="accountPass" class="form-control"'
      + 'placeholder="Password" ng-model="accountPass" ng-minlength="8"'
      + 'name="accountPass" my-validator required></form>'
    );
    $scope.model = { accountPass: null };
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));

  // describe("incompletePassword", function() {

  //   it('should be defined and initially set valid to false', function() {
  //     expect(form.$error.incompletePassword.$valid).toBeFalsy();
  //   });

  //   it('should be false when the user has met all custom password requirements', function() {
  //     form.accountPass.$setViewValue("1ABCDEF.");
  //     $scope.digest();
  //     expect(form.$error.containsNumber).toBeFalsy();
  //   });

  // });

  describe("containsNumber", function() {

    it('should be defined and initially set valid to false', function() {
      expect(form.$error.containsNumber.$valid).toBeFalsy();
    });

    it('should be set to invalid if user enters a password with no numbers' ,function() {
      form.accountPass.$setViewValue("ABCDEFGH");
      $scope.digest();
      expect(form.$error.containsNumber.$valid).toBeFalsy();
    });

    it('should be false when the user has entered at least one number in the password', function() {
      form.accountPass.$setViewValue("1ABCDEFG");
      $scope.digest();
      expect(form.$error.containsNumber).toBeFalsy();
    });
  });

});
