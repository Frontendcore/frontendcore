if ( _gaq === undefined ) var _gaq = null;

FrontendTools.trackModule = function( sCategory, sAction, sLabel, sValue ) {
	if ( _gaq !== null && oGlobalSettings.bTrackModules === true ) {
		FrontendTools.trackEvent( sCategory, sAction, sLabel, sValue );
	}
}

FrontendTools.trackEvent = function( sCategory, sAction, sLabel, sValue ) {
	if ( _gaq !== null ) {
		_gaq.push(['_trackEvent', sCategory, sAction, sLabel, sValue]);
	}
}

FrontendTools.trackPage = function( sPage ) {
	if ( _gaq !== null ) {
		_gaq.push(['_trackPageview', sPage]);
	}
}
