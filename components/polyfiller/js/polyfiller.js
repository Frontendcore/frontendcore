;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $, Modernizr) {
    'use strict';

    var oPolyfills = {};

    FrontendCore.define('polyfiller', [] , function () {
        return {
            onStart: function () {

                if (!FrontendTools.isMobile.any() ) {
                    this.checkBrowser();
                }

            },
            checkBrowser: function() {
                var aTargets = FrontendTools.getDataModules('polyfiller'),
                    oTarget = aTargets[0],
                    aTags,
                    nSupportInputs = Modernizr.inputtypes.date + Modernizr.inputtypes.email + Modernizr.inputtypes.number + Modernizr.inputtypes.month + Modernizr.inputtypes.range + Modernizr.inputtypes.datetime + Modernizr.inputtypes.color,
                    aInputs = document.getElementsByTagName('input'),
                    aInputsType = [],
                    nInputs = false;

                if (oTarget.getAttribute("data-fc-tags") !== null) {
                    aTags = oTarget.getAttribute("data-fc-tags").split(',');
                } else {
                    aTags = ['video','audio','source','details'];
                }

                for (var nKey = 0; nKey < aInputs.length; nKey++){
                    aInputsType.push(aInputs[nKey].type);
                }

                nInputs = aInputsType.indexOf('date') + aInputsType.indexOf('email') + aInputsType.indexOf('month') + aInputsType.indexOf('range') + aInputsType.indexOf('datetime') + aInputsType.indexOf('color');

                oPolyfills.shims = '';

                if ( document.getElementsByTagName('form').length > 0 ) {

                    if ( !Modernizr.input.placeholder || !Modernizr.input.required )
                    {
                        oPolyfills.shims += 'forms ';
                    }

                    if ( nSupportInputs < 5 )
                    {
                        oPolyfills.shims += ('forms-ext ');
                    }
                }

                for (var nCounter = 0; nCounter < aTags.length; nCounter++) {
                    if ($(aTags[nCounter])[0] !== undefined && !Modernizr[aTags[nCounter]] )
                    {
                        oPolyfills.shims += aTags[nCounter] + ' ';
                    }
                }

                if ( nInputs < 0 && nSupportInputs < 5) {
                    FrontendCore.requireAndStart( 'loadPolyfills');
                }

                if (!Modernizr.inputtypes.color) {
                    $("input[type='color']").css({
                        'min-width' : '170px'
                    }).after('<style>.color-popover input { padding:2px !important; min-width: 50px; }</style>');
                }

                if ( document.querySelectorAll('[data-object-fit]').length > 0 && !Modernizr.objectfit ) {
                    $.getScript(oGlobalSettings.sPathJsCore + "shims/object-fit-polyfill.js" );
                }

            }
        };
    });

    FrontendCore.define('loadPolyfills', ['polyfillsLibs'], function () {
        return {
            onStart: function () {

                if (oPolyfills.shims.length > 0 ) {

                    webshim.setOptions('basePath', oGlobalSettings.sPathJsCore + "shims/shims/");

                    webshim.polyfill(oPolyfills.shims);
                }

                FrontendTools.trackModule('JS_Libraries', 'call', 'polyfillsLibs' );


            }
        };
    });

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $, Modernizr);
