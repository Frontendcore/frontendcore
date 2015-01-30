TinyCore.AMD.define('parallax', [], function () {
	return {
		onStart: function () {

			var aTargets = oTools.getDataModules('parallax'),
				self = this;

				var s = skrollr.init();

			oTools.trackModule('JS_Libraries', 'call', 'parallax' );
		}
	};
});

