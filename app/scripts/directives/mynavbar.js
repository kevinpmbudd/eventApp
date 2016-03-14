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
      controller: myNavbarCtrl
  	};

  	return directive;

  	function myNavbarCtrl($scope, Auth, Ref, $location) {
      $scope.passwordLogin = function(email, pass) {
        $scope.err = null;
        Auth.$authWithPassword({ email: email, password: pass }, { rememberMe: true }).then(
          redirect, showError
        );
      };
      $scope.logout = function() { Auth.$unauth(); };

      function redirect() {
        $location.path('/chat');
      }

      function showError(err) {
        $scope.err = err;
      }
    }
  }