TinyCore.AMD.define('code', [], function (utils) {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		onStart: function ( ) {

			var aTargets = oTools.getDataModules('code'),
                self = this;

			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'code' );

            $(aTargets).each(function () {
                self.autobind(this);
            });

		},
		autobind: function ( aTarget ) {

            hljs.highlightBlock(aTarget);
		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});
