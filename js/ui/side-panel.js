TinyCore.AMD.define('sidepanel', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			menu : ('#side-panel'),
			push: ('.push'),
			side :"left",
			menuWidth: "15.6em",
			speed: 300,
			class: 'side-panel-default'

		},
		onStart: function ( ) {

            var aTargets = oTools.getDataModules('sidepanel'),
                self = this;



			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'sidepanel' );

            $(aTargets).each(function ( nIndex ) {
                self.autobind(this, nIndex);
            });

		},
		autobind: function ( oTarget, nIndex ) {

			var self = this,
                oSettings,
				sHref = oTarget.href,
                oOptions = {};

            if (oTarget.getAttribute("data-tc-width") !== null) {
                oOptions.menuWidth = oTarget.getAttribute("data-tc-width");
            }

			if (oTarget.getAttribute("data-tc-position") !== null) {
				oOptions.side = oTarget.getAttribute("data-tc-position");
			}

			if (oTarget.getAttribute("data-tc-class") !== null) {
				oOptions.class = oTarget.getAttribute("data-tc-class");
			}

			if (sHref.indexOf('#') !== -1) {
				oOptions.menu = '#' + sHref.split('#')[1];
			}

            oSettings = oTools.mergeOptions(self.oDefault, oOptions);

			$(oSettings.menu).addClass( oSettings.class );

            $(oTarget).bigSlide(oSettings);

			$(oTarget).on('click', function(){
				if (oSettings.side === 'right' && $(oSettings.menu).css('right') === '0px') {
					$(oSettings.menu).css('z-index','100');
				} else {
					$(oSettings.menu).css('z-index','200');
				}
			});


			if ( $(oTarget).parent( oSettings.menu ).length > 0 ) {

				var nWidth = $(oTarget).outerWidth();

				if (oSettings.side === 'right') {
					$(oTarget).css({'left' : '-' + (nWidth) + 'px'} );
				} else {
					$(oTarget).css({'right' : '-' + (nWidth) + 'px'} );
				}

				if (oTarget.getAttribute("data-tc-tab-top") !== null) {
					$(oTarget).css('top', oTarget.getAttribute("data-tc-tab-top") );
				}

			}

			if ( oSettings.side === 'right') {
				$(oSettings.menu).css({
					"right" : "-" + oSettings.menuWidth
				}).addClass('side-panel-right');
			} else {
				$(oSettings.menu).css({
					"left" : "-" + oSettings.menuWidth
				}).addClass('side-panel-left');
			}

		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});