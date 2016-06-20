;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('anchor-scroll', [], function () {

		var ua = window.navigator.userAgent,
			msie = ua.indexOf("MSIE "),
			sElementToScroll = msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ? 'html' : 'body';

		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('anchor-scroll'),
					self = this;

				FrontendTools.trackModule('JS_Libraries', 'call', 'anchor-scroll');

				$(aTargets).each(function (nIndex) {
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				FrontendTools.removeLoading(oTarget);

				$(oTarget).on('click', function(event) {

					var sHref = this.getAttribute('href'),
						target = $(sHref),
						sHeight = target.offset().top;

					if ( oTarget.getAttribute('data-fc-substract') !== null) {
						sHeight += -($(oTarget.getAttribute('data-fc-substract')).outerHeight());
					}

					if ( oTarget.getAttribute('data-fc-add') !== null) {
						sHeight += +($(oTarget.getAttribute('data-fc-add')).outerHeight());
					}

					if( target.length ) {

						event.preventDefault();

						if(history.pushState) {
							history.pushState(null, null, sHref);
						}
						else {
							location.hash = sHref;
						}

						$(sElementToScroll).stop().animate({
							scrollTop: sHeight
						}, 500);
					}
				});

				if ( window.location.hash === oTarget.getAttribute('href') ) {

					setTimeout( function(){
						$(oTarget).click();
					}, 100);
				}

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
