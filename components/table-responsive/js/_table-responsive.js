;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

		FrontendCore.define('table-responsive', [], function () {
		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('table-responsive'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'table-responsive' );

				$(aTargets).each(function ( nIndex ) {
					self.autobind(this, nIndex);
				});
			},
			autobind: function (oTarget) {

					$(oTarget).stacktable({myClass:'table table-mobile'});

					FrontendTools.removeLoading(oTarget);

			},
			onStop: function () {
				this.sPathCss = null;
				this.oDefault = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
				delete this.oDefault;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
