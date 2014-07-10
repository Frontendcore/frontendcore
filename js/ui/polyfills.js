var oPolyfills = {};

TinyCore.AMD.define('polyfills', ['devicePackage'] , function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'modal.css',
		onStart: function () {

			var aTags = ['video','audio','source'],
				nSupportInputs = Modernizr.inputtypes.date + Modernizr.inputtypes.email + Modernizr.inputtypes.number + Modernizr.inputtypes.month + Modernizr.inputtypes.range + Modernizr.inputtypes.datetime,
				aInputs = document.getElementsByTagName('input'),
				aInputsType = [],
				nInputs = false;

			for (var nKey = 0; nKey < aInputs.length; nKey++){
				aInputsType.push(aInputs[nKey].type);
			}

			nInputs = aInputsType.indexOf('date') + aInputsType.indexOf('email') + aInputsType.indexOf('month') + aInputsType.indexOf('range') + aInputsType.indexOf('datetime');

			oPolyfills.shims = [];

			if ( document.getElementsByTagName('form').length > 0 ) {

				if ( !Modernizr.input.placeholder || !Modernizr.input.required )
				{
					oPolyfills.shims.push('forms');
				}

				if ( nSupportInputs < 5 )
				{
					oPolyfills.shims.push('forms-ext');
				}
			}

			for (var nCounter = 0; nCounter < aTags.length; nCounter++) {
				if ($(aTags[nCounter])[0] !== undefined && !Modernizr[aTags[nCounter]] )
				{
					oPolyfills.shims.push(aTags[nCounter]);
				}
			}

			oPolyfills.options = {
				basePath: oGlobalSettings.sPathJs + "shims/",
				waitReady: false
			};

			if ( nInputs > -5 && nSupportInputs < 5) {
				TinyCore.AMD.requireAndStart( 'loadPolyfills');
			}

		}
	};
});

TinyCore.AMD.define('loadPolyfills', ['polyfillsLibs'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'modal.css',
		onStart: function () {

			$.webshims.setOptions(oPolyfills.options);

			$.webshims.polyfill(oPolyfills.shims);

			FC.trackEvent('JS_Libraries', 'call', 'polyfills' );

		}
	};
});