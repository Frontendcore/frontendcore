if (!oGlobalSettings) var oGlobalSettings = {};
if (!oGlobalSettings.sPathJs) oGlobalSettings.sPathJs = 'js/';
if (!oGlobalSettings.sPathRoot) oGlobalSettings.sPathRoot = oGlobalSettings.sPathJs + '../../';
if (!oGlobalSettings.sPathJsModules) oGlobalSettings.sPathJsModules = oGlobalSettings.sPathJs + 'modules';
if (!oGlobalSettings.sPathJsLibs) oGlobalSettings.sPathJsLibs = oGlobalSettings.sPathJs + '../../';
if (!oGlobalSettings.sPathJsCore) oGlobalSettings.sPathJsCore = oGlobalSettings.sPathJs + '../../';
if (!oGlobalSettings.sPathcss) oGlobalSettings.sPathcss = './css/';
if (!oGlobalSettings.bTrackModules) oGlobalSettings.bTrackModules = false;
if (!oGlobalSettings.sHash) oGlobalSettings.sHash = '1';
if (!oGlobalSettings.aPaths) oGlobalSettings.aPaths = {};
if (!oGlobalSettings.sDevice) oGlobalSettings.sDevice = isMobile.any() ? 'desktop' : 'desktop' ;

var oModules = {},
	aModules = ['devicePackage','sidemenuLibs','codeLibs','sortableLibs','tagsLibs','modalLibs','autocompleteLibs','autosizeLibs','graphLibs','statsLibs','wysiwygLibs','truncateLibs','tipLibs','cartLibs','polyfillsLibs','parallaxLibs','carouselLibs','tableLibs'];

for (var nKey = 0; nKey < aModules.length; nKey++) {

	switch (aModules[nKey]) {
		case 'devicePackage':
			oModules[aModules[nKey]] = oGlobalSettings.aPaths[aModules[nKey]] !== undefined ? oGlobalSettings.aPaths[aModules[nKey]] : oGlobalSettings.sPathJsCore + 'devices/' + oGlobalSettings.sDevice;
		break;
		default :
			oModules[aModules[nKey]] = oGlobalSettings.aPaths[aModules[nKey]] !== undefined ? oGlobalSettings.aPaths[aModules[nKey]] : oGlobalSettings.sPathJsCore + 'ui/' + aModules[nKey].replace('Libs', '');
		break;
	}
}

TinyCore.AMD.config( {
	require : {
		urlArgs: "v=" + oGlobalSettings.sHash,
		baseUrl : oGlobalSettings.sPathJsModules,
		paths : {
			libs: oGlobalSettings.sPathJsLibs,
			devicePackage: oModules.devicePackage,
			sidemenuLibs: oModules.sidemenuLibs,
			codeLibs: oModules.codeLibs,
			sortableLibs: oModules.sortableLibs,
			tagsLibs: oModules.tagsLibs,
			modalLibs: oModules.modalLibs,
			autocompleteLibs: oModules.autocompleteLibs,
			autosizeLibs: oModules.autosizeLibs,
			graphLibs: oModules.graphLibs,
			statsLibs: oModules.statsLibs,
			wysiwygLibs: oModules.wysiwygLibs,
			truncateLibs: oModules.truncateLibs,
			tipLibs: oModules.tipLibs,
			cartLibs: oModules.cartLibs,
			polyfillsLibs: oModules.polyfillsLibs,
            carouselLibs: oModules.carouselLibs,
			parallaxLibs: oModules.parallaxLibs,
			tableLibs: oModules.tableLibs
		}
	}
});

