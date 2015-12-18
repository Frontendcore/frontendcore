;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $, RoundTrip) {
    'use strict';

    FrontendCore.define('product-list', [], function (utils) {

        function saveData(){

        }

        return {
            onStart: function () {

                var aTargets = FrontendTools.getDataModules('product-list'),
                    self = this;

                FrontendTools.trackModule('JS_Libraries', 'call', 'product-list');

            }
        }
    });

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $, RoundTrip);