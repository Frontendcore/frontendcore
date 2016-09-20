;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
    'use strict';

    FrontendCore.define('password-meter', [], function () {
        return {
            oDefault: {
                showMeter: true,
                showToggle: true,
                toggleMask: true,
                toggleTitle: 'show',
                inputTemplate: '<div class="password-meter-input">{input}<span></span>{toggle}</div>',
                meterTemplate: '<div class="kv-scorebar-border">{scorebar}{score}</div>{verdict}',
                mainTemplate: '<table class="password-meter"><tr><td>{input}</td><td class="kv-meter-container">{meter}</td></tr></table>',
                verdictClasses: {
                    0: 'label',
                    1: 'label _error',
                    2: 'label _warning',
                    3: 'label _info',
                    4: 'label _success',
                    5: 'label _success',
                },
            },
            onStart: function () {

                var aTarget = FrontendTools.getDataModules('password-meter'),
                    oSettings,
                    oOptions = {},
                    self = this,
                    oTarget;

                FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

                FrontendTools.trackModule('JS_Libraries', 'call', 'password-meter' );

                $(aTarget).each( function(){
                    oTarget = this;

                    oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                    $(oTarget).strength(oSettings);

                    setTimeout( function(){
                        $('.password-meter-input span').on( 'click', function() {
                            $(this).toggleClass('active');
                            $(this).next().click();
                        });
                    },1000);

                });
            }
        };
    });

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);