'use strict';

/**
 * @ngdoc directive
 * @name eventAppApp.directive:myModelOnBlur
 * @description
 * # myModelOnBlur
 */
angular.module('eventAppApp')
  .directive('myModelOnBlur', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1,
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;

            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
    };
});
