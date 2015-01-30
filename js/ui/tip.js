TinyCore.AMD.define('tip', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			fixed: true
		},
		onStart: function () {

			var aTargets = oTools.getDataModules('tip'),
				self = this;

			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'tip' );

			$(aTargets).each(function () {
				self.autobind(this);
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

			oSettings = oTools.mergeJSON(oOptions, self.oDefault);

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