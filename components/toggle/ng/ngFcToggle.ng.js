;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcToggle', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(["toggle"],function (){
                    var oTip =  FrontendCore.instantiate('toggle');
                    oTip.autobind(element[0]);
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);