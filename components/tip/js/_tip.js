;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, FrontendMediator, $) {
	'use strict';

	FrontendCore.define('tip', ['tipLibs'], function () {

		var bindedElements = [];

		return {
			oDefault: {
				contentAsHTML: true,
				position: 'bottom',
                repositionOnScroll: true,
				functionReady: function(origin, continueTooltip) {
					//$('body').css('overflow','auto');
					FrontendMediator.publish('tip:open');
				},
				functionAfter: function(origin, continueTooltip) {
                    //$('body').css('overflow','');
                    FrontendMediator.publish('tip:close');
                }
			},
			onStart: function ( ) {

				var aTargets = FrontendTools.getDataModules('tip'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'tip' );

				$(aTargets).each(function () {
					self.autobind(this);
				});

			},
            bind: function (oTarget, oCustomOptions) {

			    var oSettings,
                    oOptions = oOptions === undefined ? oCustomOptions : {};

                oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                $(oTarget).tooltipster(oSettings);
            },
            open: function (oTarget) {
                $(oTarget).tooltipster('open');
            },
            close: function (oTarget) {

			    if (oTarget === undefined) {
                    var instances = $.tooltipster.instances();
                    $.each(instances, function(i, instance){
                        instance.close();
                    });
                } else {
                    $(oTarget).tooltipster('close');
                }

            },
			autobind: function (oTarget, sData) {

				var self = this,
					oSettings,
					oOptions = {},
					oContent = oTarget.getAttribute("data-fc-content");

				if ( oTarget.id === '') {
					oTarget.id = FrontendTools.getSelector(oTarget);
				}

                if ( bindedElements.indexOf(oTarget.id ) ==-1 ) {

                    bindedElements.push(oTarget.id);


                    if (oTarget.getAttribute("data-fc-position") !== null) {
                        oOptions.position = oTarget.getAttribute("data-fc-position");
                    }

                    if (oTarget.getAttribute("data-fc-interactive") === 'true') {
                        oOptions.interactive = true;
                        if (oTarget.getAttribute("data-fc-trigger") !== 'click') {
                            oTarget.setAttribute("data-fc-trigger",'click');
                        }
                    }

                    if (oTarget.getAttribute("data-fc-trigger") === 'click') {
                        oOptions.trigger = 'click';
                    }

                    if ( oOptions.trigger === 'click') {
                        $(oTarget).click(function (e) {
                            e.preventDefault();
                        });
                    }

                    if ( oContent !== null) {

                        if ( oContent.lastIndexOf('#', 0) === 0 ) {
                            oOptions.content = $(oContent);
                        } else {
                            oOptions.content = oContent;
                        }
                    }

                    oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                    if ( oSettings.content !== undefined ){

                        if ( window.RoundTrip !== undefined) {

                            oSettings.trigger = 'click';

                            FrontendTools.bind( oTarget , 'mouseover', function(currentTarget, e) {

                                $(currentTarget.target)
                                    .tooltipster(oSettings)
                                    .click();

                            });
                        } else {
                            $(oTarget).tooltipster(oSettings);
                        }
                    }
				}

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, FrontendMediator, $);
