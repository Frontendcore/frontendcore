$( document ).ready(function() {


    define('jQuery', ['jquery'], function (jq) {
        return window.jQuery;
    });

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

	// adds mobile browser class to html tag
	var ua = navigator.userAgent.toLowerCase();
	function removeSpaces(ua) {
		return ua.split(' ').join('');
	}
	ua = removeSpaces(ua);
	var iOS = ua.match(/(iphone|ipod|ipad)/);
	if(iOS) {
		$('html').addClass('ios');
	}
	var iPad = ua.match(/(ipad)/);
	if(iPad) {
		$('html').addClass('ipad');
	}
	var iPhone = ua.match(/(iphone|ipod)/);
	if(iPhone) {
		$('html').addClass('iphone');
	}
	var android = ua.indexOf("android") > -1;
	if(android) {
		$('html').addClass('android');
	}
	var android4 = ua.indexOf("android4") > -1;
	if(android4) {
		$('html').addClass('android4');
	}
	var android2 = ua.indexOf("android2") > -1;
	if(android2) {
		$('html').addClass('android2');
	}

});
