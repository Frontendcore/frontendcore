/* jshint -W093: */
/*jshint loopfunc: true */

/**
 * RoundTrip.js
 * A tiny webapp architecture.
 * @author tonipinel (tonipinel@gmail.com)
 */
;( function (oEnv, twig) {
    'use strict';

    var _null_ = null,
        _true_ = true,
        _false_ = false,
        oBBDD = {},
        oTemplates = {},
        oModules = {},
        oFCModules = {},
        aDataCache = [],
        oModulesChannels = {},
        oChannels = {},
        sRoundTripData = 'RoundTripData',
        sModule = 'module:',
        sChannel = 'data:';

    /**
     * The core
     * @type {Object}
     */
    var RoundTrip = {
        /**
         * Current version
         * @type {String}
         */
        version: '1.0.0',
        /**
         * The bind manager.
         * @type {Object}
         */
        Bind: _null_,
        /**
         * The data manager.
         * @type {Object}
         */
        Data: _null_,
        /**
         * The modules manager.
         * @type {Object}
         */
        Module: _null_,
        /**
         * The templates manager.
         * @type {Object}
         */
        Template: _null_,
        /**
         * The error handler.
         * @type {Object}
         */
        Error: _null_,
    };


    function checkFinish() {
        if (aDataCache.length === Object.keys(oModules).length ){
            FrontendMediator.publish(['data:finish' ] );
        }
    }

    function asyncInnerHTML( targets, HTML, callback) {

        for ( var oTarget in targets) {
            if ( typeof(targets[oTarget]) === 'object') {

                targets[oTarget].innerHTML = HTML;
                callback( targets[oTarget] );
            }
        }



    }

    RoundTrip.Data = function( data ) {

        var typeOfData = typeof(data),
            item,
            aChannels = [];

        if ( typeOfData === 'object' ) {

            var oData = data;

            for( item in oData ) {

                oChannels[item] = oData[item];

                FrontendMediator.publish([ sChannel + item ], oChannels );
            }

            checkFinish();

        } else if ( data === sRoundTripData ) {

            aDataCache.push(sRoundTripData + Date.now());

            oBBDD.RoundTripData = oGlobalSettings.RoundTripData;

            for ( item in oBBDD.RoundTripData) {

                oChannels[item] = oBBDD.RoundTripData[item];

                aChannels.push(sChannel + item);
            }

            FrontendMediator.publish(aChannels, oChannels);

            checkFinish();

        } else if ( data.indexOf('[') !== -1 ) {

                aDataCache.push(sRoundTripData + Date.now() );

                oBBDD[sRoundTripData] = oGlobalSettings.RoundTripData;

                var aCurrentChannels = data.replace('[','').replace(']','').split(',');

                for( item in oBBDD.RoundTripData ) {

                    oChannels[item] = oBBDD.RoundTripData[item];

                    if ( aCurrentChannels.indexOf( item ) !== -1 ){
                        aChannels.push(sChannel + item);
                    }
                }

                FrontendMediator.publish( aChannels , oChannels );

                checkFinish();

        } else {

            var sUrl = data;

            if ( aDataCache.indexOf(sUrl) === -1 ) {

                aDataCache.push(sUrl);

                $.ajax({
                    url: sUrl,
                    async: false,
                    success: function (oData) {

                        oBBDD[sUrl] = oData;

                        checkFinish();

                    }
                });

            }
        }

    };

    RoundTrip.Template = function( oModule, sId , sHref, sData ) {

        $.get( sHref , function( sTemplate ) {

            oTemplates[sId] = twig({
                id: sId,
                data: sTemplate
            });

            renderTemplate( sId, sData);

        });

    };

    function getChannels( oData ) {

        var aDataChannels = [];

        for ( var key in oData ){

            aDataChannels.push(key);
        }

        return aDataChannels;
    }

    function getSelector( element ) {
        if (element===document.body)
            return element.tagName;

        var ix= 0;
        var siblings= element.parentNode.childNodes;
        for (var i= 0; i<siblings.length; i++) {
            var sibling= siblings[i];
            if (sibling===element)
                return getSelector(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
            if (sibling.nodeType===1 && sibling.tagName===element.tagName)
                ix++;
        }
    }


    function renderTemplate( sId, sData ) {


        var oData,
            aCurrentChannels;


        if (sData.indexOf('[') !== -1) {

            aCurrentChannels = sData.replace('[','').replace(']','').split(',');

            sData = sRoundTripData;

            oData = oBBDD[sData];

        } else {

            oData = oBBDD[sData];

            aCurrentChannels = getChannels(oData);
        }

        for ( var nKey = 0; nKey < aCurrentChannels.length; nKey++ ) {

            if (oModulesChannels[ aCurrentChannels[nKey]] === undefined ) {
                oModulesChannels[ aCurrentChannels[nKey]] = [];
            }

            oModulesChannels[ aCurrentChannels[nKey]].push( sId );

            oChannels[aCurrentChannels[nKey]] = oData[aCurrentChannels[nKey]];
        }

        // Render this template on new data

        FrontendMediator.subscribe( sModule + sId , function ( oTopic )
        {
            var oData = oTopic.data !== undefined ? oTopic.data : {},
                oTargetRenders = document.querySelectorAll('[data-fc-render*="'+ sId +'"]');


            asyncInnerHTML( oTargetRenders, oTemplates[sId].render(oData) , function( oTarget ){


                var oTargetModules = oTarget.querySelectorAll('[data-fc-modules]');

                for ( var nTarget in oTargetModules ) {

                    var self = oTargetModules[nTarget];

                    if ( typeof(self) === 'object') {

                        if (self.id === '') {
                            self.id = FrontendTools.getSelector(self);
                        }

                        if (oFCModules[self.dataset.fcModules] === undefined) {

                            FrontendCore.requireAndStart(self.dataset.fcModules);
                        }

                        oFCModules[self.dataset.fcModules] = _true_;
                    }


                }

            });

        });

        if (Object.keys(oModules).length === Object.keys(oTemplates).length ){
            FrontendMediator.publish(['templates:finish' ], oChannels );
        }

    }


    function forEachModule( sFunction ) {

        var oModule,
            sData,
            sUrlTemplate,
            sId;


        for ( var sModule in oModules ) {

            oModule = oModules[sModule];
            sData = oModules[sModule].dataset.fcData !== undefined ? oModules[sModule].dataset.fcData : sRoundTripData ;
            sUrlTemplate = oModules[sModule].dataset.fcTemplate;
            sId = oModules[sModule].dataset.fcRender;

            if ( sFunction === 'data') {
                RoundTrip.Data( sData );
            } else if ( sFunction === 'template') {
                RoundTrip.Template( oModule, sId, sUrlTemplate, sData );
            }

        }

    }

    RoundTrip.getModules = function() {
      return oModules;
    };

    // Add RoundTrip to the environment.
    oEnv.RoundTrip = RoundTrip;

    oEnv.window.onload = function() {

        var oTempModules = oEnv.document.querySelectorAll('[data-fc-render]');

        // add Roundtrip data
        if ( oGlobalSettings.RoundTripData !== undefined) {
            RoundTrip.Data( oGlobalSettings.RoundTripData );
        }

        // Register modules
        for ( var nKey = 0; nKey < oTempModules.length; nKey++ ) {
            oModules[oTempModules[nKey].dataset.fcRender] = oTempModules[nKey];
        }

        FrontendMediator.subscribe( ['data:finish'], function ( oTopic )
        {
            forEachModule( 'template' );

            FrontendMediator.unsubscribe(['data:finish']);

        } );

        FrontendMediator.subscribe( ['templates:finish'], function ( oTopic )
        {

            var channel, oData;

            for ( channel in oTopic.data ) {

                var sThisChannel = sChannel + channel;

                oData = {};

                oData[channel] = oChannels[channel];

                FrontendMediator.subscribe( sThisChannel, function( data ){

                    var channel = data.name.toString().replace('data:','');

                    for ( var module in oModulesChannels[channel]) {

                        FrontendMediator.publish( sModule + oModulesChannels[channel][module], oChannels  );
                    }

                });
            }

            for ( channel in oChannels ) {

                oData = {};

                oData[ channel ] = oChannels[channel];

                FrontendMediator.publish( sChannel + channel, oData );

            }

        } );

        forEachModule( 'data' );

    };

}(this, twig ) );