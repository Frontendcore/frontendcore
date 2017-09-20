;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcTelField', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(['tel-field','tel-field-libs'],function (){
                    var oModule =  FrontendCore.instantiate('tel-field');
                    oModule.autobind(element[0],Date.now());
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);