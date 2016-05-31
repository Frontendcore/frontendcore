;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendTools.swipe = function( oTarget, oOptions) {


		if ( oOptions.allowPageScroll === undefined) {
			oOptions.allowPageScroll = "vertical";
		}

		$(oTarget).swipe(
			oOptions
		);
	};

	FrontendCore.define('swipe', [], function () {
		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('swipe'),
					self = this;

				$(aTargets).each(function ( nIndex ) {

					self.autobind(this, nIndex);
				});

				FrontendTools.trackModule('JS_Libraries', 'call', 'swipe' );

			},
			autobind: function (oTarget, nIndex) {

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
