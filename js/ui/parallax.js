TinyCore.AMD.define('parallax', ['devicePackage'], function () {
	return {
		onStart: function () {

			var aTargets = FC.getDataModules('parallax'),
				self = this;

			require(['parallaxLibs'], function() {
				var s = skrollr.init();
			});

			FC.trackEvent('JS_Libraries', 'call', 'parallax' );
		}
	};
});

