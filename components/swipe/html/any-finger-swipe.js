;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('any-finger-swipe', ['swipe'], function () {
		return {
			onStart: function () {

				FrontendTools.swipe( "#any-finger-swipe", {
					swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
						$(this).text("You swiped " + direction + " with " + fingerCount + " fingers");
					},
					threshold:0,
					fingers:'all'
				});
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
