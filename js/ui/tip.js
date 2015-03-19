FrontendCore.define('tip', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			fixed: true
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

			if (oTarget.getAttribute("data-fc-title") !== null) {
				oOptions.title = oTarget.getAttribute("data-fc-title");
			}

			if (oTarget.getAttribute("data-fc-content") !== null) {
				oOptions.content = oTarget.getAttribute("data-fc-content");
			}

			oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

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