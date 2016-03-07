;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('select-search', [], function () {
		return {
			oDefault: {
				searchInput: true
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('select-search'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css');

				FrontendTools.trackModule('JS_Libraries', 'call', 'select-search' );

				$( aTargets ).each(function ( nIndex) {
					self.autobind(this, nIndex);
				});

				$('a', '.bselect-option-list').on('click', function(e) {
					e.preventDefault();
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

				$(oTarget).bselect(oSettings);

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
