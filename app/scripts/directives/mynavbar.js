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
    controllerAs: 'user',
    bindToController: true
  };

  return directive;

  function myNavbarCtrl($scope, Auth, Ref, $location, $log, $firebaseObject) {
    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({ email: email, password: pass }, { rememberMe: true })
      .then(setNavbarGreetingName)
      .then(redirect, showError);
    };
    $scope.logout = function() { Auth.$unauth(); };

    function setNavbarGreetingName(user) {
    	$scope.profile = $firebaseObject(Ref.child('users').child(user.uid))
    }

    function redirect() {
      $location.path('/chat');
    }

    function showError(err) {
      $scope.err = err;
    }
  }
}
