;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('anchor-scroll', [], function () {

		var ua = window.navigator.userAgent,
			msie = ua.indexOf("MSIE "),
			mozilla = ua.indexOf("Firefox"),
			sElementToScroll = msie > 0 || mozilla > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ? 'html' : 'body';

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

				var self = this;

				FrontendTools.removeLoading(oTarget);

				$(oTarget).on('click', function(event) {

					self.scrollTo(event, this);

				});

				if ( window.location.hash === oTarget.getAttribute('href') ) {

					setTimeout( function(){
						$(oTarget).click();
					}, 100);
				}

			},
			scrollTo: function(event, oLink ) {

				if ( oLink.nodeName !== 'A') {
					oLink = $(oLink).parents('a')[0];
				}

				var sHref = '#' + oLink.href.split('#')[1],
					$Target = $(sHref),
					sHeight = $Target.offset().top;

				if ( oLink.getAttribute('data-fc-substract') !== null) {
					sHeight += -($(oLink.getAttribute('data-fc-substract')).outerHeight());
				}

				if ( oLink.getAttribute('data-fc-add') !== null) {
					sHeight += +($(oLink.getAttribute('data-fc-add')).outerHeight());
				}

				if ( oLink.getAttribute('data-fc-scroller') !== null) {
                    sElementToScroll = oLink.getAttribute('data-fc-scroller');
				}

				if( $Target.length ) {

					event.preventDefault();

					if(window.history.replaceState) {
						window.history.replaceState(null, null, sHref);
					}
					else {
						window.location.hash = sHref;
					}

					$(sElementToScroll).stop().animate({
						scrollTop: sHeight
					}, 500);

				}
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
