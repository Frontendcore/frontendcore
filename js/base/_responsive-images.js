TinyCore.AMD.define('responsive-images', ['devicePackage'], function () {
	return {
		onStart: function () {

			$("img").unveil(200);

			$( window ).resize(function() {
				$("img").unveil(200);
			});

			oTools.trackEvent('JS_Libraries', 'call', 'responsive-images' );
		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});