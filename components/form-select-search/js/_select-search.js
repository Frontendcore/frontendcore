;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('select-search', [], function () {
		return {
			oDefault: {
				disable_search_threshold: 10,
				no_results_text: "Oops, nothing found!",
				//max_selected_options: 1,
				allow_single_deselect: false,
				width: '100%'
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('select-search'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'select-search' );

				$( aTargets ).each(function ( nIndex) {
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				var self = this,
					oSettings,
					oOptions = {};

				if (oTarget.getAttribute("data-fc-search") !== null) {
					oOptions.searchInput = oTarget.getAttribute("data-fc-search");
				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				FrontendTools.removeLoading(oTarget);

				$(oTarget).chosen(oSettings);


				oOptions = null;
			},
			onStop: function () {
				this.sPathCss = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
