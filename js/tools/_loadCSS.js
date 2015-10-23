FrontendTools.loadCSS = function ( sCssPath, sCssMedia ) {

	var sId = sCssPath.replace('/','');

	// If the CSS is not already loaded
	if ( sCssPath && !document.getElementById(sId) ) {

		var head = document.getElementsByTagName('head')[0],
			element = document.createElement('link');

		element.rel = 'stylesheet';
		element.type = 'text/css';
		element.href = sCssPath;
		element.id = sId;
		element.media = 'non-existant-media';
		head.appendChild(element, head.firstChild);
		setTimeout(function () {
			element.media = sCssMedia ? sCssMedia : 'all';
		});

	}

}
