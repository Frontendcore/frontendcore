;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcModal', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(['modal'],function (){
                    var oModal =  FrontendCore.instantiate('modal');
                    oModal.autobind(element[0]);
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);