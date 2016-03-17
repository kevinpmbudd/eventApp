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
		$scope.createAccount = function(email, pass) {
	      $scope.err = null;
	        Auth.$createUser({email: email.trim(), password: pass.trim()})
	          .then(function () {
	            // authenticate so we have permission to write to Firebase
	            return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
	          })
	          .then(createProfile)
	          .then(redirect, showError);

	      function createProfile(user) {
	        $log.log(user);
	        var ref = Ref.child('users').child(user.uid), def = $q.defer();
	        ref.set({email: email, fname: $scope.firstName.trim(), lname: $scope.lastName.trim()}, function(err) {
	          $timeout(function() {
	            if( err ) {
	              def.reject(err);
	            }
	            else {
	              def.resolve(ref);
	              $scope.$emit('setName', $scope.firstName);
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
	}
}