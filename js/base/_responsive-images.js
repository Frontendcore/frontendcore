;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('responsive-images', ['responsive-images-libs'], function () {
		return {
			onStart: function () {

				$("img").unveil(200);

				$( window ).resize(function() {
					$("img").unveil(200);
				});

				FrontendTools.trackEvent('JS_Libraries', 'call', 'responsive-images' );
			},
			onStop: function () {
				this.sPathCss = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
