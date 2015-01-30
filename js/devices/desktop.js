TinyCore.AMD.define( 'desktop', ['desktopPackage'], function ()
{
	return {
		floor : null,
		/**
		 * This (mandatory) function will be called when the module is started.
		 * @param  {Object} oStartData The data passed when starting the module.
		 */
		onStart : function ( oStartData )
		{
			TinyCore.AMD.domBoot( function ( aModulesData )
			{
				for (var nKey = 0; nKey < aModulesData.length; nKey++){
					oTools.trackEvent('JS_Libraries', 'execute', aModulesData[nKey].name )
				}
			} );

			if ( oGlobalSettings.bResponsiveImages === true ) {
				TinyCore.AMD.requireAndStart('responsive-images');
				oTools.trackEvent('JS_Libraries', 'execute', 'responsive-images' );
			}

			if ( oGlobalSettings.bCart === true ) {
				TinyCore.AMD.requireAndStart('cart');
				oTools.trackEvent('JS_Libraries', 'execute', 'cart' );
			}
		},
		/**
		 * This (optional) function will be called when the module is stopped.
		 */
		onStop : function ()
		{
			// Cleanup (in order to be properly restarted?)
			this.floor = null;
		},
		/**
		 * This (optional) function will be called when the module is destroyed.
		 */
		onDestroy : function ()
		{
			// Complete cleanup!
			delete this.floor;
		},
		getFloor : function ()
		{
			return this.floor;
		}
	};
} );