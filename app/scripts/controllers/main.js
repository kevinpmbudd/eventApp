'use strict';

/**
 * @ngdoc function
 * @name eventAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eventAppApp
 */
angular.module('eventAppApp')
  .controller('MainCtrl', function ($scope, Auth, $location, $q, Ref, $timeout, $log) {
    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !$scope.name ) {
        $scope.err = 'Please enter your name';
      }
      else if( !email ) {
        $scope.err = 'Please enter your email';
      }
      else if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        Auth.$createUser({email: email, password: pass})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(createProfile)
          .then(redirect, showError);
      }

      function createProfile(user) {
        $log.log(user);
        var ref = Ref.child('users').child(user.uid), def = $q.defer();
        ref.set({email: email, name: $scope.name}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });
        return def.promise;
      }
    };

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  });