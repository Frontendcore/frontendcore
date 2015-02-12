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

            $(aTargets).each(function () {
                self.autobind(this);
            });

		},
		autobind: function ( oTarget ) {

			var self = this,
                oSettings,
				sHref = oTarget.href,
                oOptions = {};

            if (oTarget.getAttribute("data-tc-width") !== null) {
                oOptions.menuWidth = oTarget.getAttribute("data-tc-width");
            }

			if (oTarget.getAttribute("data-tc-side") !== null) {
				oOptions.side = oTarget.getAttribute("data-tc-side");
			}

			if (oTarget.getAttribute("data-tc-class") !== null) {
				oOptions.class = oTarget.getAttribute("data-tc-class");
			}

			if (sHref.indexOf('#') !== -1) {
				oOptions.menu = '#' + sHref.split('#')[1];
			}

            oSettings = oTools.mergeOptions(self.oDefault, oOptions);

			$(oSettings.menu).addClass( oSettings.class);

            $(oTarget).bigSlide(oSettings);

			console.log(oSettings.side);

			if ( oSettings.side === 'right') {
				$(oSettings.menu).css({
					"right" : "-" + oSettings.menuWidth
				});
			} else {
				$(oSettings.menu).css({
					"left" : "-" + oSettings.menuWidth
				});
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