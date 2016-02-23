;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('image-responsive', [], function () {
		return {
			onStart: function () {

				$("img").unveil(200);

				$( window ).resize(function() {
					$("img").unveil(200);
				});

				FrontendTools.trackEvent('JS_Libraries', 'call', 'image-responsive' );
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
