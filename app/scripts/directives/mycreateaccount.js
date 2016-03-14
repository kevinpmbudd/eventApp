'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myCreateAccount
 * @description
 * # myCreateAccount
 */
angular.module('eventAppApp')
  .directive('myCreateAccount', myCreateAccount);

function myCreateAccount() {
	var directive = {
		restrict: 'E',
    templateUrl: 'views/mycreateaccount.html',
    controller: myCreateAccountCtrl,
    bindToController: true
	};

	return directive;

	function myCreateAccountCtrl($scope, Auth, $location, $q, Ref, $timeout, $log) {
		$scope.createAccount = function(email, pass, confirm) {
	      $scope.err = null;
	      $log.log(email);
	      $log.log(pass);
	      $log.log(confirm);
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

	    function ucfirst (str) {
	      // inspired by: http://kevin.vanzonneveld.net
	      str += '';
	      var f = str.charAt(0).toUpperCase();
	      return f + str.substr(1);
	    }



	    function redirect() {
	      $location.path('/account');
	    }

	    function showError(err) {
	      $scope.err = err;
	    }
	  }
}