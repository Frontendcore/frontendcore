TinyCore.AMD.define('truncate', [], function () {
	return {
		oDefault: {
			max_length: 100,
			more: '[+]',
			less: '[-]'
		},
		onStart: function () {

			var aTarget = document.querySelectorAll('[data-tc-modules="truncate"]'),
                self = this;

			oTools.trackModule('JS_Libraries', 'call', 'truncate' );

			self.autobind(aTarget);

		},
		autobind: function (aTargets) {

			var self = this;

			$( aTargets ).each(function () {

				var oSettings,
					oOptions = {};

				if (this.getAttribute("data-tc-max") !== null) {
					oOptions.max_length = this.getAttribute("data-tc-max");
				}

				if (this.getAttribute("data-tc-more") !== null) {
					oOptions.more = this.getAttribute("data-tc-more");
				}

				if (this.getAttribute("data-tc-less") !== null) {
					oOptions.less = this.getAttribute("data-tc-less");
				}

				oSettings = oTools.mergeOptions(self.oDefault, oOptions);

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