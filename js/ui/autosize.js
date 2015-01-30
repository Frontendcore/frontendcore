TinyCore.AMD.define('autosize', [], function () {
	return {
		onStart: function () {

			var aTargets = oTools.getDataModules('autosize'),
				self = this;

			oTools.trackModule('JS_Libraries', 'call', 'autosize' );

			$(aTargets).each(function () {
				self.autobind(this);
			});

		},
		autobind: function (oTarget, sData) {

			$(oTarget).addClass('animated height');

			$(oTarget).autosize();

		}
	};
});

