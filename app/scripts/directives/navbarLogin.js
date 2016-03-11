angular.module('eventAppApp')
  .directive('navbarLogin', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: '../../views/navbarLogin.html',
      scope: {},
      controller: navbarLoginCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    function navbarLoginCtrl() {
      $scope.passwordLogin = function(email, pass) {
        $scope.err = null;
        Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
          redirect, showError
        );
      };

      function redirect() {
        $location.path('/account');
      }

      function showError(err) {
        $scope.err = err;
      }
    }
  }]);