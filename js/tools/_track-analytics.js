if ( _gaq === undefined ) var _gaq = null;

oTools.trackModule = function( sCategory, sAction, sLabel, sValue ) {
	if ( _gaq !== null && oGlobalSettings.bTrackModules ) {
		_gaq.push(['_trackEvent', sCategory, sAction, sLabel, sValue]);
	}
}

oTools.trackEvent = function( sCategory, sAction, sLabel, sValue ) {
	if ( _gaq !== null ) {
		_gaq.push(['_trackEvent', sCategory, sAction, sLabel, sValue]);
	}
}

oTools.trackPage = function( sPage ) {
	if ( _gaq !== null ) {
		_gaq.push(['_trackPageview', sPage]);
	}
}