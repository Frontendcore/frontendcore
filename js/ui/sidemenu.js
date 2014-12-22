TinyCore.AMD.define('sidemenu', ['devicePackage'], function (utils) {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'sidemenu.css',
		oDefault: {
			renaming: false
		},
		onStart: function ( ) {

            var aTargets = FC.getDataModules('sidemenu'),
                self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'sidemenu' );

            require(['sidemenuLibs'], function() {
                $(aTargets).each(function () {
                    self.autobind(this);
                });
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

            oSettings = FC.mixOptions(oOptions, self.oDefault);

            $(oTarget).sidr(oSettings);

			if (oOptions.side !== 'right') {
				oBindActions.open = 'swipeLeft';
				oBindActions.close = 'swipeRight';
			}
/*
			$(document).on('swipeRight',function(e){
				$.sidr('open', oOptions.name);
			});

			$(document).on('swipeLeft', function(e){
				$.sidr('close', oOptions.name);
			});*/
		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});

TinyCore.AMD.define('loadSideMenu', ['sidemenuLibs'], function () {
	return {
		onStart: function () {


		}
	};
});