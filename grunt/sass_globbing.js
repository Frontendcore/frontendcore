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

		oConfig = {};

		for (var scssPackage in oScssPackages) {
			oConfig[scssPackage.replace('-','')] = {
                files: getRoutes(oScssPackages[scssPackage], getDeviceByScreen(scssPackage), scssPackage)
			}
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

	function getRoutes(screen, sDevice, arrayKey) {

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
			sKey,
			oScssComponents = oComponents;

		// Create key and add the default scss

        if (Object.prototype.toString.call(screen) === '[object Array]') {
            sKey = aPaths[0] + '/_components_' + arrayKey + '.scss';
            oFiles[sKey] = [];
            for (var screenItem in screen) {
                oFiles[sKey].push( fcCwd + 'components/essence/scss/_fc-' + screen[screenItem] + '_essence.scss');
            }
        } else {
            sKey = aPaths[0] + '/_components_' + sScreen + '.scss';
            oFiles[sKey] = [];
            oFiles[sKey].push( fcCwd + 'components/essence/scss/_fc-' + sScreen + '_essence.scss');
		}



        oFiles[sKey].push(fcCwd + 'components/essence/scss/_frontendcore.scss');


		if (oData !== null && oData.icons.destScss !== undefined) {
			oFiles[sKey].push(appCwd + '/' + oData.icons.destScss + '/_icons-placeholders.scss');
		} else {
			oFiles[sKey].push(fcCwd + 'components/icons/scss/_icons-placeholders.scss');
		}

		// FC SCREEN COMPONENTS

		for (var sComponent in oScssComponents) {
            if (Object.prototype.toString.call(screen) === '[object Array]') {
                for (var screenItem in screen) {
                    oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/_fc-' + screen[screenItem] + '_essence.scss');
                }
            } else {
				oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/_fc-' + sScreen + '_essence.scss');
            }
			oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_vars*.scss');
			oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_pattern*.scss');

            if (Object.prototype.toString.call(screen) === '[object Array]') {
                for (var screenItem in screen) {
                    oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_' + screen[screenItem] + '*.scss');
                }
            } else {
                oFiles[sKey].push(fcCwd + 'components/' + oScssComponents[sComponent] + '/**/*_' + sScreen + '*.scss');

            }
		}

		// FC DEVICE COMPONENTS

		if (sDevice !== undefined) {
			oFiles[sKey].push(fcCwd + 'components/**/*_' + sDevice + '*.scss');

		}

		// CUSTOM COMPONENTS (DEVICE & SCREEN)
		for (var nPath = 0; nPath < aPaths.length; nPath++) {
			oFiles[sKey].push(aPaths[nPath] + '/**/*_vars*.scss');
			oFiles[sKey].push(aPaths[nPath] + '/**/*_pattern*.scss');

			if (sDevice !== undefined && (oData !== null && oData.scss !== undefined && oData.scss.defaultDeviceGroup !== false)) {
				oFiles[sKey].push(aPaths[nPath] + '/**/*_' + sDevice + '*.scss');
			}

            if (Object.prototype.toString.call(screen) === '[object Array]') {
                for (var screenItem in screen) {

                	if ( screen[screenItem] !== 'desktop' && screen[screenItem] !== 'tablet' && screen[screenItem] !== 'mobile' ) {
                        oFiles[sKey].push(aPaths[nPath] + '/**/*_' + screen[screenItem] + '*.scss');
                        oFiles[sKey].push('!' + aPaths[nPath] + '/**/*_components_' + screen[screenItem] + '*.scss');
					}
				}
            } else {
                oFiles[sKey].push(aPaths[nPath] + '/**/*_' + sScreen + '*.scss');
                oFiles[sKey].push('!' + aPaths[nPath] + '/**/_components_' + sScreen + '.scss');

            }
		}
		return oFiles
	}
	return oConfig;
}


