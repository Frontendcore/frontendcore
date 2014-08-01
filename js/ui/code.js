TinyCore.AMD.define('code', ['devicePackage','codeLibs'], function (utils) {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'code.css',
		onStart: function ( ) {

			var aTarget = document.querySelectorAll('[data-tc-modules="code"]');

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'code' );

			this.autobind(aTarget);

		},
		autobind: function ( aTargets ) {

			var self = this;

			$( aTargets ).each(function(i, e) {
				//hljs.highlightBlock(e);
			});
		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});
