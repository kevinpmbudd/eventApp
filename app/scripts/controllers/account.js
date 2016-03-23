'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('eventAppApp')
  .controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject, $timeout, myDate) {
    $scope.user = user;
    $scope.logout = function() { Auth.$unauth(); };
    $scope.messages = [];
    var profile = $firebaseObject(Ref.child('users/'+user.uid));
    profile.$bindTo($scope, 'profile');

    $scope.update = function (date) {
      profile.birthday = myDate.dateToObject(date);
      profile.$save().then(function(ref) {
        console.log('success', ref);
      }, function (error) {
        console.log('error ', error);
      });
    };

    profile.$loaded()
    .then(function(data) {
      // $scope.birthday = new Date(profile.bdYear, profile.bdMonth - 1, profile.bdDay);
      if ($scope.birthday) {
        $scope.birthday = myDate.objectToDate(profile.birthday);
      }
    });

    // $scope.changePassword = function(oldPass, newPass, confirm) {
    //   $scope.err = null;
    //   if( !oldPass || !newPass ) {
    //     error('Please enter all fields');
    //   }
    //   else if( newPass !== confirm ) {
    //     error('Passwords do not match');
    //   }
    //   else {
    //     Auth.$changePassword({email: profile.email, oldPassword: oldPass, newPassword: newPass})
    //       .then(function() {
    //         success('Password changed');
    //       }, error);
    //   }
    // };

    // $scope.changeEmail = function(pass, newEmail) {
    //   $scope.err = null;
    //   Auth.$changeEmail({password: pass, newEmail: newEmail, oldEmail: profile.email})
    //     .then(function() {
    //       profile.email = newEmail;
    //       profile.$save();
    //       success('Email changed');
    //     })
    //     .catch(error);
    // };

    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

  });
