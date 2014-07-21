TinyCore.AMD.define('autocomplete', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'autocomplete.css',
		oDefault: {
			limit: 12
		},
		onStart: function () {

			var aTargets = FC.getDataModules('autocomplete'),
				self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'autocomplete' );

			require(['autocompleteLibs'], function() {
				$(aTargets).each(function () {
					self.autobind(this);
				});
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

				oSettings = FC.mixOptions(oOptions, self.oDefault);

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