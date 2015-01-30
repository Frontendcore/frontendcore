TinyCore.AMD.define('autocomplete', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			limit: 12
		},
		onStart: function () {

			var aTargets = oTools.getDataModules('autocomplete'),
				self = this;

			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'autocomplete' );

			$(aTargets).each(function () {
				self.autobind(this);
			});
		},
		autobind: function (oTarget, sData) {

			var self = this,
				oSettings,
				oOptions = {},
				$Target = $(oTarget),
				sValues = oTarget.getAttribute('data-tc-values'),
                aValues,
                aTemp = {};

                oOptions.source = [];

				if (sData === undefined && sValues !== null) {

                    aValues = oTarget.getAttribute('data-tc-values').split(',');

                    for( var nKey = 0; aValues.length > nKey; nKey++){
                        aTemp = {};
                        aTemp.value = aValues[nKey];
                        aTemp.label = aValues[nKey];
                        oOptions.source.push(aTemp);
                        oOptions.source.push(aTemp);
                    }

				}

				oSettings = oTools.mergeJSON(oOptions, self.oDefault);

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