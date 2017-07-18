;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcTruncate', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(['truncate'],function (){
                    var oTruncate =  FrontendCore.instantiate('truncate');
                    oTruncate.autobind(element[0],Date.now());
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);