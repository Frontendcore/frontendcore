;(function (angular, FrontendCore, FrontendMediator, FrontendTools) {
    'use strict';

    FrontendCore.ngModule = FrontendCore.ngModule || angular.module('frontendcore', []);

    FrontendCore.ngModule.directive('ngFcCarousel', ['$document', function($document) {
        return {
            link: function(scope, element, attrs) {
                FrontendCore.require(['carousel'],function (){
                    var oModal =  FrontendCore.instantiate('carousel');
                    oModal.autobind(element[0]);
                });
            }
        }
    }]);

})(angular, FrontendCore, FrontendMediator, FrontendTools);