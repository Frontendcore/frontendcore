;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('tip', [], function () {
		return {
			oDefault: {
				contentAsHTML: true,
				position: 'bottom',
				functionReady: function(origin, continueTooltip) {
					$('body').css("overflow-x", "");
				},
				functionAfter: function(origin, continueTooltip) {
					$('body').css("overflow-x", "");
				}
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('tip'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'tip' );

				$(aTargets).each(function () {
					self.autobind(this);
				});

			},
			autobind: function (oTarget, sData) {

				var self = this,
					oSettings,
					oOptions = {},
					oContent = oTarget.getAttribute("data-fc-content");

				if ( oTarget.id === '') {
					oTarget.id = FrontendTools.getSelector(oTarget);
				}

				if (oTarget.getAttribute("data-fc-position") !== null) {
					oOptions.position = oTarget.getAttribute("data-fc-position");
				}

				if (oTarget.getAttribute("data-fc-trigger") === 'click') {
					oOptions.trigger = 'click';
					oOptions.hideOnClick = true;

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
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
