;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcPolyfiller', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(['polyfiller'],function (){
                    var oPolyfiller =  FrontendCore.instantiate('polyfiller');
                    oPolyfiller.onStart();
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);