;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $, Modernizr) {
    'use strict';

    var oPolyfills = {};

    FrontendCore.define('polyfiller', [] , function () {

        function checkInputTypes() {
            var aInputTypesToCheck = ['date','email','number','month','range','datetime','color'],
                aInputsInPage = document.getElementsByTagName('input'),
                aInputTypeInPage = [];

            for (var i = 0; i < aInputsInPage.length; i++){
                aInputTypeInPage.push(aInputsInPage[i].type);
            }

            for (var j = 0; j < aInputTypesToCheck.length; j++){
                var typeToCheck = aInputTypesToCheck[j];
                if (
                    (!Modernizr.inputtypes[typeToCheck]) && //check Modernizr tag to look if element is supported
                    (aInputTypeInPage.indexOf(typeToCheck)>=0)
                ) {
                    return true; // we have a tag not supported and present in page. Return true to load library.
                }
            }
            //No tags found or all tags are supported
            return false;
        }

        function checkBrowser() {
            var aTargets = FrontendTools.getDataModules('polyfiller'),
                oTarget = aTargets[0],
                bInputTagsNotSupported = false,
                bTagsNotSupported = false,
                bRequiredPlaceholderNotSupported = false;

            oPolyfills.shims ='';

            //let's check if we have some unsupported InputTypes.
            if ( checkInputTypes() ) {
                bInputTagsNotSupported = true;
                oPolyfills.shims += ('forms forms-ext ');
            }

            //let's check if we have some tags unsupported
            var aTags = [];
            if (oTarget.getAttribute("data-fc-tags") !== null) {
                aTags = oTarget.getAttribute("data-fc-tags").split(',');
            } else {
                aTags = ['video','audio','source','details'];
            }
            for (var i = 0; i < aTags.length; i++) {
                if (
                    (!Modernizr[aTags[i]]) &&//check Modernizr tag to look if element is supported
                    ($(aTags[i])[0] !== undefined)  //check if we have an element of current tag
                ) {
                    oPolyfills.shims += aTags[i] + ' '; //We add element to shims configuration.
                    bTagsNotSupported = true;
                }
            }

            //let's check placeholder and required if input forms are supported
            if (
                (!bInputTagsNotSupported) &&
                (document.getElementsByTagName('form').length > 0)
            ){
                if ( !Modernizr.input.placeholder || !Modernizr.input.required ) {
                    oPolyfills.shims += 'forms ';
                    bRequiredPlaceholderNotSupported = true;
                }
            }

            //check if we need to Load Library
            if (bInputTagsNotSupported || bTagsNotSupported || bRequiredPlaceholderNotSupported){
                FrontendCore.requireAndStart('loadPolyfills');
            }

            //add css if color is not supported.
            if (!Modernizr.inputtypes.color) {
                $("input[type='color']").css({
                    'min-width' : '170px'
                }).after('<style>.color-popover input { padding:2px !important; min-width: 50px; }</style>');
            }

            //check object fit
            if ( document.querySelectorAll('[data-object-fit]').length > 0 && !Modernizr.objectfit ) {
                $.getScript(oGlobalSettings.sPathJsCore + "shims/object-fit-polyfill.js" );
            }
        }

        return {
            onStart: function () {
                if (!FrontendTools.isMobile.any() ) {
                    checkBrowser();
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
