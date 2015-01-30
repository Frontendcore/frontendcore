oTools.loadCSS = function ( sPathCss ) {

	var sId = sPathCss.replace('/','');

	// If the CSS is not already loaded
	if ( sPathCss && !document.getElementById(sId) ) {

		var oLink = document.createElement('link');

		// creates the link to the stylesheet
		oLink.rel = 'stylesheet';
		oLink.type = 'text/css';
		oLink.id = sId;
		oLink.href = sPathCss;

		// Load the CSS
		$(document.body).append(oLink);
	}

}