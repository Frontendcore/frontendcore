TinyCore.AMD.define('autosize', ['devicePackage'], function () {
	return {
		onStart: function () {

			var aTargets = FC.getDataModules('autosize'),
				self = this;

			FC.trackEvent('JS_Libraries', 'call', 'autosize' );

			require(['autosizeLibs'], function() {
				$(aTargets).each(function () {
					self.autobind(this);
				});
			});


		},
		autobind: function (oTarget, sData) {

			$(oTarget).addClass('animated height');

			$(oTarget).autosize();

		}
	};
});

