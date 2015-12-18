FrontendTools.loadCSS = function ( sCssPath, sCssMedia ) {

	var sId = sCssPath.replace('/',''),
		fMatchMedia = window.matchMedia,
		sCssMedia = sCssMedia ? sCssMedia : 'all',
		oCss = {};

	function loadCss(sCssPath, sCssMedia) {

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
				element.media = sCssMedia;
			});
		}
	}

	// If the CSS is not already loaded
	if ( !fMatchMedia || window.matchMedia(sCssMedia).matches ) {

		loadCss(sCssPath, sCssMedia);

	} else if ( !window.matchMedia(sCssMedia).matches ) {

		oCss[sCssPath] = sCssMedia;

		window.addEventListener("resize", function() {

			for ( var property in oCss) {

				if  (window.matchMedia(oCss[property]).matches) {
					loadCss( property, oCss[property] );
				}
			}
		} );
	}



}
