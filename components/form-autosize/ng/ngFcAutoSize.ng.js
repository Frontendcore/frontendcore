;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcAutoSize', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(['autosize'],function (){
                    var oModule =  FrontendCore.instantiate('autosize');
                    oModule.bind(element[0]);
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);