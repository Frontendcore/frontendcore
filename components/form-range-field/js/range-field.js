;(function (window, document, oGlobalSettings, FrontendMediator, FrontendTools, FrontendCore, $) {
    'use strict';



    FrontendCore.define('range-field', ['range-field-libs'], function () {


        var nGlobalIndex = 1000,
            sId = 'fc-range-';



        function init(oTarget, oOptions, oCustomOptions, nIndex) {
            if (nIndex === undefined) {
                nIndex = nGlobalIndex;
                nGlobalIndex++;
            }

            FrontendCore.require(['range-field-libs'], function (noUiSlider) {

                $.when(
                    $(oTarget)
                        .hide()
                        .after('<div id="'+ sId + nIndex + '"></div>')
                ).then(
                    function () {

                        var oSlider = document.getElementById( sId + nIndex );

                        if (oCustomOptions.pips !== undefined) {
                            oOptions.pips = oCustomOptions.pips;
                        }

                        noUiSlider.create( oSlider , oOptions );

                        oSlider.noUiSlider.on('update', function( values, handle ) {
                            $(oTarget).val(parseFloat(values[handle])).trigger('input');
                        });

                        FrontendMediator.subscribe('rangeInput:' + sId + nIndex, function (oResponse) {
                            oSlider.noUiSlider.set(oResponse.data.value);
                        });

                        if (oCustomOptions.inputSync !== undefined) {

                            var $InputSync = $(oCustomOptions.inputSync);

                            oSlider.noUiSlider.on('update', function( values, handle ) {
                                $InputSync.val(parseFloat(values[handle]));
                            });

                            $InputSync.on('change input', function() {
                                oSlider.noUiSlider.set( this.value );
                            });
                        }
                    }
                );

            });


        }

        function round(value, precision) {
            var multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        }

        return {
            oDefault: {
                start: 5,
                step: 1,
                behaviour: 'snap',
                connect: [true, false],
                range: {
                    'min': 0,
                    'max': 10
                }
            },
            onStart: function () {

                var aTargets = FrontendTools.getDataModules('range-field'),
                    self = this;

                FrontendTools.trackModule('JS_Libraries', 'call', 'range-field');

                $(aTargets).each( function(nIndex){
                    self.autobind(this, nIndex);
                });

            },
            bind: function (oTarget, oOptions, nIndex) {

                var self = this,
                    oCustomOptions = {},
                    oSettings;

                oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                init(oTarget, oSettings, oCustomOptions, nIndex);

            },
            autobind: function (oTarget, nIndex) {


                var self = this,
                    oOptions = {},
                    oCustomOptions = {},
                    oSettings;

                if (oTarget.getAttribute('data-fc-step') !== null ) {
                    oOptions.step =  Number(oTarget.getAttribute('data-fc-step'));
                }

                if (oTarget.getAttribute('data-fc-target-input') !== null ) {
                    oCustomOptions.inputSync =  oTarget.getAttribute('data-fc-target-input');
                }

                if (oTarget.getAttribute("min") !== null || oTarget.getAttribute("max") !== null  ) {
                    oOptions.range = {};
                }

                // MIN
                if (oTarget.getAttribute("min") !== null ) {
                    oOptions.range.min = parseInt(oTarget.getAttribute("min"));
                }

                // MAX
                if (oTarget.getAttribute("max") !== null ) {
                    oOptions.range.max = parseInt(oTarget.getAttribute("max"));
                }

                // START
                if (oTarget.getAttribute("value") !== null ) {
                    oOptions.start = parseInt(oTarget.getAttribute("value"));
                }

                // TOOLTIPS
                if (oTarget.getAttribute("data-fc-tooltip") !== null ) {
                    oOptions.tooltips = true;
                }


                // TOOLTIPS
                if (oTarget.getAttribute("data-fc-suffix") !== null ) {
                    oOptions.format = {
                        to: function ( value ) {
                            return  ( round(value, 1)  + oTarget.getAttribute("data-fc-suffix"));
                        },
                        from: function ( value ) {
                            return value.replace(oTarget.getAttribute("data-fc-suffix"), '');
                        }
                    };
                }

                if (oTarget.getAttribute('data-fc-pips') !== null ) {
                    oCustomOptions.pips = {
                        mode: 'positions',
                        values: [0,50,100],
                        density: 4
                    };
                }

                oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                init(oTarget, oSettings, oCustomOptions, nIndex);

            }
        };
    });


})(window, document, oGlobalSettings, FrontendMediator, FrontendTools, FrontendCore, $);
