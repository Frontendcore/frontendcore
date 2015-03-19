FrontendCore.define('parallax', [], function () {
	return {
		onStart: function () {

			var aTargets = FrontendTools.getDataModules('parallax'),
				self = this;

				var s = skrollr.init();

			FrontendTools.trackModule('JS_Libraries', 'call', 'parallax' );
		}
	};
});

