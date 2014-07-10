onDomReady(function () {
	TinyCore.AMD.domBoot( function ( aModulesData )
	{
		for (var nKey = 0; nKey < aModulesData.length; nKey++){
			FC.trackEvent('JS_Libraries', 'execute', aModulesData[nKey].name )
		}
	} );

	if ( oGlobalSettings.bResponsiveImages === true ) {
		TinyCore.AMD.requireAndStart('responsive-images');
		FC.trackEvent('JS_Libraries', 'execute', 'responsive-images' );
	}

	if ( oGlobalSettings.bCart === true ) {
		TinyCore.AMD.requireAndStart('cart');
		FC.trackEvent('JS_Libraries', 'execute', 'cart' );
	}

});