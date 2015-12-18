$( document ).ready(function() {

	FrontendCore.domBoot(function (aModulesData) {
		for (var nKey = 0; nKey < aModulesData.length; nKey++) {
			FrontendTools.trackModule('JS_Libraries', 'execute', aModulesData[nKey].name);
		}
	});

	if ( oGlobalSettings.oCss ) {

		for ( var property in oGlobalSettings.oCss) {
			FrontendTools.loadCSS( property, oGlobalSettings.oCss[property] );
		}

	}

});
