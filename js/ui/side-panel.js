TinyCore.AMD.define('side-panel', [], function () {
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

            var aTargets = oTools.getDataModules('side-panel'),
                self = this;


			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'side-panel' );

            $(aTargets).each(function ( nIndex ) {
                self.autobind(this, nIndex);
            });

		},
		autobind: function ( oTarget, nIndex ) {

			var self = this,
                oSettings,
				sHref = oTarget.href,
                oOptions = {},
				oParent;

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

			$(oSettings.menu).addClass( oSettings.class).removeClass('hidden');

            $(oTarget).bigSlide(oSettings);


			if ( $(oSettings.menu)[0].className.indexOf('navigation') !== -1 ) {

				$(oTarget).on('click', function(){

					if (oSettings.side === 'right') {
						if ( $(oSettings.menu).css('right') !== '0px') {
							$(oSettings.menu).css('z-index','1000');
							$('html').css({
								'position': 'absolute',
								'overflow' : 'hidden',
								'width' : $(window).width() + oSettings.menuWidth
							}).animate({
								'padding-right' : $(oSettings.menu).width()
							});
						} else {
							$('html').css({
								'position': 'relative',
								'width' : 'auto',
								'overflow' : 'auto'
							}).animate({
								'padding-right' : 0
							});
						}
					} else {
						if ( $(oSettings.menu).css('left') !== '0px') {
							$(oSettings.menu).css('z-index','1000');
							$('html').css({
								'position': 'absolute',
								'overflow' : 'hidden',
								'width' : $(window).width() + oSettings.menuWidth
							}).animate({
								'padding-left' : $(oSettings.menu).width()
							});
						} else {
							$('html').css({
								'position': 'relative',
								'width' : 'auto',
								'overflow' : 'auto'
							}).animate({
								'padding-left' : 0
							});

						}
					}

				});
				
			} else {

				$(oTarget).on('click', function(){
					if (oSettings.side === 'right' && $(oSettings.menu).css('right') === '0px') {
						$(oSettings.menu).css('z-index','1000');
					} else {
						$(oSettings.menu).css('z-index','1001');
					}
				});

			}



			oParent = $(oTarget).parent( oSettings.menu )[0];

			if ( oParent !== undefined) {

				var nWidth = $(oTarget).outerWidth();

				if (oSettings.side === 'right') {
					$(oTarget).css({'left' : '-' + (nWidth -1) + 'px'} );
				} else {
					$(oTarget).css({'right' : '-' + (nWidth -1 ) + 'px'} );
				}

				if (oTarget.getAttribute("data-tc-tab-top") !== null) {
					$(oTarget).css('top', oTarget.getAttribute("data-tc-tab-top") );
				}


				if (oParent.className.indexOf('box') !== -1){

					$(oParent).css('overflow', 'visible');
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