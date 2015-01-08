TinyCore.AMD.define('code', ['devicePackage'], function (utils) {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'code.css',
		onStart: function ( ) {

			var aTargets = FC.getDataModules('code'),
                self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'code' );

            require(['codeLibs'], function() {
                $(aTargets).each(function () {
                    self.autobind(this);
                });
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
