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

				sPosition = oTarget.getAttribute('data-fc-position') ? oTarget.getAttribute('data-fc-position') : 'absolute';

				if ( sPosition == 'absolute') {
					nWindowHeight = $( oTarget).parent().height();
					nWindowWidth = $( oTarget ).parent().width();
					$( oTarget ).parent().css('position','relative');
				}

				$(oTarget).css({
					'position' : sPosition,
					'z-index' : 100
				});

				nHeight = oTarget.getAttribute('data-fc-height') ? oTarget.getAttribute('data-fc-height') : $(oTarget).height();
				nWidth = oTarget.getAttribute('data-fc-width') ? oTarget.getAttribute('data-fc-width') : $(oTarget).width();

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
