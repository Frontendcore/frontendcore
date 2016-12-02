FrontendTools.loadCSS = function ( sCssPath, sCssMedia, fpCallback, scope ) {

	var sId = sCssPath.replace('/',''),
		fMatchMedia = window.matchMedia,
		sCssMedia = sCssMedia ? sCssMedia : 'all',
		oCss = {};

	function loadCss(sCssPath, sCssMedia, fpCallback, scope) {

		if ( sCssPath && !document.getElementById(sId) ) {
			var head = document.getElementsByTagName('head')[0],
				element = document.createElement('link');

			element.rel = 'stylesheet';
			element.type = 'text/css';
			element.href = sCssPath;
			element.id = sId;
			element.media = 'non-existant-media';

			if (fpCallback !== undefined) {
				//browser dependent, use sheet->cssRules or styleSheet->rules ...
				var checkLoadedCSSRules;
				if ( 'sheet' in element ) {
					checkLoadedCSSRules = function () {
						return element['sheet'] && element['sheet']['cssRules'].length;
					};
				}
				else {
					checkLoadedCSSRules = function () {
						return element['styleSheet'] && element['styleSheet']['rules'].length;
					};
				}

				var checkTime = 15,
					maxTime = 60000,
					currentTime = 0;

				var timeoutFn = function() {
					if (checkLoadedCSSRules()) {
						fpCallback.call(scope || window, true, element);
					}
					else {
						currentTime += checkTime;
						if (currentTime > maxTime) {
							fpCallback.call(scope || window, false, element);
						}
						else {
							setTimeout(timeoutFn, checkTime);
						}
					}
				};
				timeoutFn();
			}

			head.appendChild(element, head.firstChild);
			setTimeout(function () {
				element.media = sCssMedia;
			});
		}
	}

	// If the CSS is not already loaded
	if ( !fMatchMedia || window.matchMedia(sCssMedia).matches ) {

		loadCss(sCssPath, sCssMedia, fpCallback, scope);

	} else if ( !window.matchMedia(sCssMedia).matches ) {

		oCss[sCssPath] = sCssMedia;

		window.addEventListener("resize", function() {

			for ( var property in oCss) {

				if  (window.matchMedia(oCss[property]).matches) {
					loadCss( property, oCss[property], fpCallback, scope );
				}
			}
		} );
	}



}
