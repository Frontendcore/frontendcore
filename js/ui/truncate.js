; (function (window, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('truncate', ['devicePackage'], function () {
	return {
		oDefault: {
			max_length: 100,
			more: '+',
			less: '-'
		},
		onStart: function () {

			var aTarget = document.querySelectorAll('[data-fc-modules="truncate"]'),
                self = this;

			FrontendTools.trackModule('JS_Libraries', 'call', 'truncate' );

			self.autobind(aTarget);

		},
		autobind: function (aTargets) {

			var self = this;

			$( aTargets ).each(function () {

				var oSettings,
					oOptions = {};

				if (this.getAttribute("data-fc-max") !== null) {
					oOptions.max_length = this.getAttribute("data-fc-max");
				}

				if (this.getAttribute("data-fc-more") !== null) {
					oOptions.more = this.getAttribute("data-fc-more");
				}

				if (this.getAttribute("data-fc-less") !== null) {
					oOptions.less = this.getAttribute("data-fc-less");
				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				FrontendTools.removeLoading(this);

				$(this).truncate(oSettings);



			});
		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});

})(window, oGlobalSettings, FrontendTools, FrontendCore, $ );
