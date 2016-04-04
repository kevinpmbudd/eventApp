'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myNavbar
 * @description
 * # myNavbar
 */
angular.module('eventAppApp')
  .directive('myNavbar', myNavbar);

function myNavbar() {
  var directive = {
    restrict: 'E',
    templateUrl: 'views/mynavbar.html',
    controller: myNavbarCtrl,
    bindToController: true
  };

  return directive;

  function myNavbarCtrl($scope, Auth, Ref, $location, $log, $firebaseObject) {
    $('.navbar-collapse').click('li', function() {
      $('.navbar-collapse').collapse('hide');
    });

    $scope.auth = Auth;

    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      // setNavbarGreetingName($scope.authData);
    });

    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({ email: email, password: pass }, { rememberMe: true })
        .then(redirect, showError);
    };
    $scope.logout = function() {
      Auth.$unauth();
      $location.path('/');
    };

    function redirect() {
      $location.path('/events');
    }

    function showError(err) {
      $scope.err = err;
    }
  }
}
