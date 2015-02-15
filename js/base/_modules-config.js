if (!oGlobalSettings.sPathJs) oGlobalSettings.sPathJs = 'js/';
if (!oGlobalSettings.sPathJsModules) oGlobalSettings.sPathJsModules = oGlobalSettings.sPathJs + 'modules';
if (!oGlobalSettings.sPathJsLibs) oGlobalSettings.sPathJsLibs = oGlobalSettings.sPathJs + '../../';
if (!oGlobalSettings.sPathJsCore) oGlobalSettings.sPathJsCore = oGlobalSettings.sPathJs + '../../';
if (!oGlobalSettings.sPathCss) oGlobalSettings.sPathCss = './css/';
if (!oGlobalSettings.sPathCssUI) oGlobalSettings.sPathCssUI = oGlobalSettings.sPathCss + 'ui.css';
if (!oGlobalSettings.bTrackModules) oGlobalSettings.bTrackModules = false;
if (!oGlobalSettings.sHash) oGlobalSettings.sHash = '1';
if (!oGlobalSettings.oPaths) oGlobalSettings.oPaths = {};
if (!oGlobalSettings.sDevice) oGlobalSettings.sDevice = isMobile.any() ? 'desktop' : 'desktop' ;

var oDefaultPaths = {
		libs: oGlobalSettings.sPathJs
	},
	aModules = ['devicePackage','code','sortable','tags','modal','autocomplete','autosize','graph','stats','wysiwyg','truncate','tip','cart','polyfills','parallax','carousel','table','toggle','tabs','notification','dropdown','center-box','side-panel'];

for (var nKey = 0; nKey < aModules.length; nKey++) {

	switch (aModules[nKey]) {
		case 'devicePackage':
			oDefaultPaths.devicePackage = oGlobalSettings.oPaths[aModules[nKey]] !== undefined ? oGlobalSettings.oPaths[aModules[nKey]] : oGlobalSettings.sPathJsCore + 'devices/' + oGlobalSettings.sDevice;
		break;
		default :
			oDefaultPaths[aModules[nKey] + 'Libs'] = oGlobalSettings.oPaths[aModules[nKey]] !== undefined ? oGlobalSettings.oPaths[aModules[nKey]] : oGlobalSettings.sPathJsCore + 'ui/' + aModules[nKey].replace('', '');
			oDefaultPaths[aModules[nKey]] = oGlobalSettings.oPaths[aModules[nKey]] !== undefined ? oGlobalSettings.oPaths[aModules[nKey]] : oGlobalSettings.sPathJsCore + 'ui/' + aModules[nKey].replace('', '');
		break;
	}
}

var oPaths = oTools.mergeJSON( oDefaultPaths, oGlobalSettings.oPaths);

TinyCore.AMD.config( {
	require : {
		urlArgs: "v=" + oGlobalSettings.sHash,
		baseUrl : oGlobalSettings.sPathJsModules,
		paths : oPaths
	}
});
