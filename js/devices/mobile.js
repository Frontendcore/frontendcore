FrontendCore.define( 'mobile', ['mobilePackage'], function ()
{
	return {
		floor : null,
		/**
		 * This (mandatory) function will be called when the module is started.
		 * @param  {Object} oStartData The data passed when starting the module.
		 */
		onStart : function ( oStartData )
		{
			FrontendCore.domBoot( function ( aModulesData )
			{
				for (var nKey = 0; nKey < aModulesData.length; nKey++){
					FrontendTools.trackEvent('JS_Libraries', 'execute', aModulesData[nKey].name )
				}
			} );

			if ( oGlobalSettings.bResponsiveImages === true ) {
				FrontendCore.requireAndStart('responsive-images');
				FrontendTools.trackEvent('JS_Libraries', 'execute', 'responsive-images' );
			}

			if ( oGlobalSettings.bCart === true ) {
				FrontendCore.requireAndStart('cart');
				FrontendTools.trackEvent('JS_Libraries', 'execute', 'cart' );
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