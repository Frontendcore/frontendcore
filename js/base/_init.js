onDomReady(function () {

	require(['devicePackage'], function() {
		TinyCore.AMD.domBoot(function (aModulesData) {
			for (var nKey = 0; nKey < aModulesData.length; nKey++) {
				oTools.trackEvent('JS_Libraries', 'execute', aModulesData[nKey].name)
			}
		});
	});

	if ( oGlobalSettings.bResponsiveImages === true ) {
		TinyCore.AMD.requireAndStart('responsive-images');
		oTools.trackEvent('JS_Libraries', 'execute', 'responsive-images' );
	}

	if ( oGlobalSettings.bCart === true ) {
		TinyCore.AMD.requireAndStart('cart');
		oTools.trackEvent('JS_Libraries', 'execute', 'cart' );
	}

});