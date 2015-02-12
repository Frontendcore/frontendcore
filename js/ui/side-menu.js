TinyCore.AMD.define('sidemenu', [], function (utils) {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			renaming: false
		},
		onStart: function ( ) {

            var aTargets = oTools.getDataModules('sidemenu'),
                self = this;

			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'sidemenu' );

            $(aTargets).each(function () {
                self.autobind(this);
            });

		},
		autobind: function ( oTarget ) {

			var self = this,
                oSettings,
                oOptions = {},
                sHref = oTarget.href,
				oBindActions = {
					open : 'swipeRight',
					close : 'swipeLeft'
				};

            if (oTarget.getAttribute("data-tc-position") !== null) {
                oOptions.side = oTarget.getAttribute("data-tc-position");
            }

            if (sHref.indexOf('#') !== -1) {
                oOptions.source = '#' + sHref.split('#')[1];
                oOptions.name = sHref.split('#')[1] + '-' + new Date().getTime();
            }

            oSettings = oTools.mergeOptions(self.oDefault, oOptions);

            $(oTarget).sidr(oSettings);

		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});