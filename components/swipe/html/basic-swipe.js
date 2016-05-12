;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('basic-swipe', ['swipe'], function () {
		return {
			onStart: function () {

				FrontendTools.swipe( "#basic-swipe", {
					//Generic swipe handler for all directions
					swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
						$(this).text("You swiped " + direction);
					}
				});
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
