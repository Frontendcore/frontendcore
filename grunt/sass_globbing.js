module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var sOneScreen = undefined,
		oConfig = {};

	function getDeviceByScreen( sScreen) {

		var sDevice = '';

		switch (sScreen) {
			case "screen-xxxl":
			case "screen-xxl":
			case "screen-xl":
				sDevice = 'desktop';
				break;
			case "screen-l":
				sDevice = 'tablet';
				break;
			case "screen-m":
			case "screen-s":
			case "screen-xs":
				sDevice = 'mobile';
			break;
			case "secondary":
				sDevice = 'secondary';
			break;
			case "main":
			default:
				sDevice = undefined;
				break;
		}

		return sDevice;

	}

	if (currentTasks.indexOf('css:one') === -1) {
		oConfig = {
			main: {
				files: getRoutes('main', getDeviceByScreen('main'))
			},
			secondary: {
				files: getRoutes('secondary', getDeviceByScreen('secondary'))
			},
			screenXXXL: {
				files: getRoutes('screen-xxxl', getDeviceByScreen('screen-xxxl'))
			},
			screenXXL: {
				files: getRoutes('screen-xxl', getDeviceByScreen('screen-xxl'))
			},
			screenXL: {
				files: getRoutes('screen-xl', getDeviceByScreen('screen-xl'))
			},
			screenL: {
				files: getRoutes('screen-l', getDeviceByScreen('screen-l'))
			},
			screenM: {
				files: getRoutes('screen-m', getDeviceByScreen('screen-m'))
			},
			screenS: {
				files: getRoutes('screen-s', getDeviceByScreen('screen-s'))
			},
			screenXS: {
				files: getRoutes('screen-xs', getDeviceByScreen('screen-s'))
			},
		}
	} else {

		var aTemp = grunt.option('scssCwd').split('/');
		sOneScreen = aTemp[aTemp.length - 1].replace('.scss','');

		oConfig = {
			one: {
				files: getRoutes(sOneScreen, getDeviceByScreen(sOneScreen))
			}
		}
	}

	function getRoutes(screen, sDevice) {

		var sScreen = screen !== undefined ? screen : 'main',
			aPaths = [];

		if (oData !== null && oData.scss !== undefined && oData.scss.cwd !== undefined && Object.prototype.toString.call(oData.scss.cwd) === '[object Array]') {
			for (var nKey = 0; nKey < oData.scss.cwd.length; nKey++) {
				aPaths.push(getRelativePath(oData.scss.cwd[nKey]));
			}
		} else {
			aPaths.push(scssCwd);
		}

		var oFiles = {},
			sKey = aPaths[0] + '/_components_' + sScreen + '.scss',
			oScssComponents = oComponents;

		oFiles[sKey] = [
			fcCwd + 'components/essence/scss/_fc-' + sScreen + '_essence.scss',
			fcCwd + 'components/essence/scss/_frontendcore.scss'

		];

		for (var sComponent in oScssComponents) {
			oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/_fc-' + sScreen + '_essence.scss');
			oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_vars*.scss');
			oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_pattern*.scss');
			oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_icons.scss');
			oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_' + sScreen + '*.scss');
		}
        if (sDevice !== undefined) {
            oFiles[sKey].push(fcCwd + 'components/**/*_' + sDevice + '*.scss');

        }

		for (var nPath = 0; nPath < aPaths.length; nPath++) {
			oFiles[sKey].push(aPaths[nPath] + '/**/*_vars*.scss');
			oFiles[sKey].push(aPaths[nPath] + '/**/*_pattern*.scss');
            if (sDevice !== undefined) {
                oFiles[sKey].push(aPaths[nPath] + '/**/*_' + sDevice + '*.scss');
            }
			oFiles[sKey].push(aPaths[nPath] + '/**/*_' + sScreen + '*.scss');
			oFiles[sKey].push('!' + aPaths[nPath] + '/**/_components_' + sScreen + '.scss');
		}


		
		return oFiles
	}
	return oConfig;
}


