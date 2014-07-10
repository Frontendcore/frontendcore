TinyCore.AMD.define('tip', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'tips.css',
		oDefault: {
			fixed: true
		},
		onStart: function () {

			var aTargets = FC.getDataModules('tip'),
				self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'tip' );

			require(['tipLibs'], function() {
				$(aTargets).each(function () {
					self.autobind(this);
				});
			});


		},
		autobind: function (oTarget, sData) {

			var self = this,
				oSettings,
				oOptions = {};

			if (oTarget.getAttribute("data-tc-title") !== null) {
				oOptions.title = oTarget.getAttribute("data-tc-title");
			}

			if (oTarget.getAttribute("data-tc-content") !== null) {
				oOptions.content = oTarget.getAttribute("data-tc-content");
			}

			oSettings = FC.mixOptions(oOptions, self.oDefault);

			if ( oSettings.content !== undefined ){
				new Opentip( oTarget , oSettings.content , oSettings);
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