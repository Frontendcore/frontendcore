;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('center-box', [], function () {
		return {
			onStart: function ( ) {

				var aTargets = FrontendTools.getDataModules('center-box'),
					self = this;

				FrontendTools.trackModule('JS_Libraries', 'call', 'center-box' );

				self.setPosition(aTargets);

				$( window ).resize(function() {
					self.setPosition(aTargets);
				});
			},
			setPosition : function( aTargets ) {

				var oTarget,
					nHeight,
					nWidth,
					sPosition,
					nWindowHeight = $( window ).height(),
					nWindowWidth = $( window ).width(),
					nLeft,
					nTop;

				$(aTargets).each(function () {

					oTarget = this;

					nWindowHeight = $( window ).height();
					nWindowWidth = $( window ).width();

					sPosition = oTarget.getAttribute('data-fc-position') ? oTarget.getAttribute('data-fc-position') : 'absolute';

					if ( sPosition == 'absolute') {

						nWindowHeight = $( oTarget).parent().outerHeight();
						nWindowWidth = $( oTarget ).parent().outerWidth();

						if ( $( oTarget ).parent().hasClass('loading') ) {

							nWindowHeight = $( oTarget ).parent().parent().outerHeight();
							nWindowWidth = $( oTarget ).parent().parent().outerWidth();

							$( oTarget ).parent().css({
								'height' : nWindowHeight + 'px',
								'width' : nWindowWidth + 'px',
								'top': 0,
								'left': 0,
								'position' : 'absolute'
							});

							$( oTarget ).parent().parent().css('position','relative');
						} else {
							$( oTarget ).parent().css('position','relative');

						}

					}

					$(oTarget).css({
						'position' : sPosition,
						'z-index' : 100
					});

					nHeight = oTarget.getAttribute('data-fc-height') ? oTarget.getAttribute('data-fc-height') : $(oTarget).outerHeight();
					nWidth = oTarget.getAttribute('data-fc-width') ? oTarget.getAttribute('data-fc-width') : $(oTarget).outerWidth();

					if (nHeight > nWindowHeight) { nHeight = nWindowHeight; }

					if (nWidth > nWindowWidth) { nWidth = nWindowWidth; }

					if (typeof nHeight === 'string') {
						if (nHeight.indexOf('px') !== -1 ) {
							nHeight = nHeight.replace('px','');
						}
					}

					if (typeof nWidth === 'string') {
						if (nWidth.indexOf('px') !== -1 ) {
							nWidth = nWidth.replace('px','');
						}
					}

					nLeft = (nWindowWidth/2) - (nWidth/2);
					nTop = (nWindowHeight/2) - (nHeight/2);

					if ( oTarget.getAttribute('data-fc-height') ) {
						$(oTarget).css('height', nHeight);
					}

					if ( oTarget.getAttribute('data-fc-width') ) {
						$(oTarget).css('width', nWidth);
					}

					$(oTarget).css({
						'left' : nLeft,
						'top' : nTop
					});

					FrontendTools.removeLoading(oTarget);

				});
			},
			onStop: function () {
				this.mediator = null;
				this.bMessageCreated = null;
				this.oTimer = null;
			},
			onDestroy: function () {
				delete this.mediator;
				delete this.bMessageCreated;
				delete this.oTimer;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
