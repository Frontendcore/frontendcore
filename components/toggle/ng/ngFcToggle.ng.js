;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcToggle', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(["toggle"],function (){
                    var oToggle =  FrontendCore.instantiate('toggle');
                    oToggle.autobind(element[0]);
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);