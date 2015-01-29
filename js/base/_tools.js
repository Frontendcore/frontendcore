var FC = {}


FC.loadCSS = function ( sPathCss ) {

    if ( sPathCss && oGlobalSettings.bCss && !document.getElementById(sPathCss) ) {
        // Load the CSS
        $(document.body).append('<link rel="stylesheet" type="text/css" id="'+ sPathCss +'" href="' + sPathCss + '" />');
    }

}

FC.getDataModules = function(sData) {
	return document.querySelectorAll('[data-tc-modules="'+ sData +'"]');

};

FC.mixOptions = function( oOptions, oSettings ) {
    var key;

    for ( key in oOptions) {
        if (oOptions.hasOwnProperty(key)) {
            oSettings[key] = oOptions[key];
        }
    }

    return oSettings;
};

if ( _gaq === undefined ) var _gaq = null;

FC.trackEvent = function( sCategory, sAction, sLabel, sValue ) {
	if ( _gaq !== null && oGlobalSettings.bTrackModules ) {
		_gaq.push(['_trackEvent', sCategory, sAction, sLabel, sValue]);
	}
}

FC.trackPage = function( sPage ) {
		_gaq.push(['_trackPageview',sPage]);
}