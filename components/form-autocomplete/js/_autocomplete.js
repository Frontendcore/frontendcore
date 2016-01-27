;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('autocomplete', [], function () {
		return {
			sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
			oDefault: {
				limit: 12
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('autocomplete'),
					self = this;

				FrontendTools.loadCSS(this.sPathCss);

				FrontendTools.trackModule('JS_Libraries', 'call', 'autocomplete');

				$(aTargets).each(function () {
					self.autobind(this);
				});
			},
			autobind: function (oTarget, sData) {

				var self = this,
					oSettings,
					oOptions = {},
					$Target = $(oTarget),
					sValues = oTarget.getAttribute('data-fc-values'),
					aValues,
					aTemp = {};

				oOptions.source = [];

				if (sData === undefined && sValues !== null) {

					aValues = oTarget.getAttribute('data-fc-values').split(',');

					for (var nKey = 0; aValues.length > nKey; nKey++) {
						aTemp = {};
						aTemp.value = aValues[nKey];
						aTemp.label = aValues[nKey];
						oOptions.source.push(aTemp);
						oOptions.source.push(aTemp);
					}

				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				$Target.autocompleter(oSettings);

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
