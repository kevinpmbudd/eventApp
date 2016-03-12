'use strict';
/**
 * @ngdoc function
 * @name eventAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('eventAppApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout) {
    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    function redirect() {
      $location.path('/chat');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
