;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('single-swipe', ['swipe'], function () {
		return {
			onStart: function () {

				//Keep track of how many swipes
				var count=0;

				FrontendTools.swipe( "#single-swipe", {
					//Single swipe handler for left swipes
					swipeLeft:function(event, direction, distance, duration, fingerCount) {
						$(this).text("You swiped " + direction + " " + ( ++count ) + " times " );
					},
					//Default is 75px, set to 0 for demo so any distance triggers swipe
					threshold:0
				});
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
