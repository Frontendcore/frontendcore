;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    var angularModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    angularModule.directive('ngFcTip', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(["tip"],function (){
                    var oTip =  FrontendCore.instantiate('tip');
                    oTip.autobind(element[0]);
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);