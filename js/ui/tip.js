;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('tip', [], function () {
		return {
			sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
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

				FrontendTools.loadCSS(this.sPathCss);

				FrontendTools.trackModule('JS_Libraries', 'call', 'tip' );

				$(aTargets).each(function () {
					self.autobind(this);
				});

			},
			autobind: function (oTarget, sData) {

				var self = this,
					oSettings,
					oOptions = {};

				if (oTarget.getAttribute("data-fc-position") !== null) {
					oOptions.position = oTarget.getAttribute("data-fc-position");
				}

				if (oTarget.getAttribute("data-fc-trigger") === 'click') {
					oOptions.trigger = 'click';
					oOptions.hideOnClick = true;

					$(oTarget).click( function(e) {
						e.preventDefault();
					});
				}

				if (oTarget.getAttribute("data-fc-content") !== null) {
					oOptions.content = oTarget.getAttribute("data-fc-content");
				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				if ( oSettings.content !== undefined ){
					$(oTarget).tooltipster(oSettings);
				}

			},
			onStop: function () {
				this.sPathCss = null;
				this.oDefault = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
				delete this.oDefault;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
