'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('eventAppApp')
  .controller('AccountCtrl', function($scope, user, Auth, Ref, $firebaseObject, $timeout) {
    $scope.user = user;
    $scope.logout = function() { Auth.$unauth(); };
    $scope.messages = [];

    var profile = $firebaseObject(Ref.child('users/' + user.uid));
    profile.$bindTo($scope, 'profile');

    $scope.update = function() {
      console.log($scope.birthday.getTime());
      profile.birthday = $scope.birthday.getTime();
      profile.$save().then(function(ref) {
        console.log('success', ref);
      }, function(error) {
        console.log('error ', error);
      });
    };

    profile.$loaded()
      .then(function(data) {
        if (profile.birthday) {
          $scope.birthday = new Date(profile.birthday);
        } else {
          $scope.birthday = new Date();
        }
      });

    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[3];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    profile.birthday = new Date();

    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = { text: msg + '', type: type };
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

  });
