module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		oPkg = require(grunt.option('fcCwd') + '/package.json'),
		sOneScreen = undefined,
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
			case "main":
			default:
				sDevice = undefined;
				break;
		}

		return sDevice;

	}


	if ( grunt.option('scssCwd') !== undefined ) {

		var aTemp = grunt.option('scssCwd').split('/');

		sOneScreen = aTemp[aTemp.length - 1].replace('.scss','');
	}

	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	if ( sOneScreen === undefined) {
		oConfig = {
			main : {
				files: getRoutes('main', getDeviceByScreen('main'))
			},
			screenXXXL: {
				files: getRoutes('screen-xxxl', getDeviceByScreen('screen-xxxl'))
			},
			screenXXL: {
				files: getRoutes('screen-xxl', getDeviceByScreen('screen-xxl') )
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
				files: getRoutes('screen-s',getDeviceByScreen('screen-s'))
			},
			screenXS: {
				files: getRoutes('screen-xs',getDeviceByScreen('screen-s'))
			},
		}
	} else {
		oConfig = {
			one: {
				files: getRoutes(sOneScreen, getDeviceByScreen(sOneScreen) )
			}
		}
	}

	function getRoutes( sScreen, sDevice ) {

		sScreen = sScreen !== undefined ? sScreen : 'main';

		var aPaths = [];

		if ( Object.prototype.toString.call( oData.scss.cwd ) === '[object Array]' ) {
			for ( var nKey = 0; nKey < oData.scss.cwd.length; nKey++ ) {
				aPaths.push( grunt.option('appCwd') + '/' +  oData.scss.cwd[nKey] );
			}
		} else {
			aPaths.push( grunt.option('appCwd') + '/' +  oData.scss.cwd );
		}

		var oFiles = {},
			sKey = aPaths[0] + '/_components_' + sScreen + '.scss',
			oComponents = oData.components !== undefined ? oData.components : oPkg.components;


		oFiles[sKey] = [
			grunt.option('fcCwd') + 'components/essence/scss/_fc-'+ sScreen +'_essence.scss',
			grunt.option('fcCwd') + 'components/essence/scss/_frontendcore.scss'

		];

		for ( var sComponent in oComponents ) {
			oFiles[sKey].push( grunt.option('fcCwd') + 'components/'+ oComponents[sComponent] +'/**/_fc-'+ sScreen +'_essence.scss' );
			oFiles[sKey].push( grunt.option('fcCwd') + 'components/'+ oComponents[sComponent] +'/**/*_vars*.scss' );
			oFiles[sKey].push( grunt.option('fcCwd') + 'components/'+ oComponents[sComponent] +'/**/*_pattern*.scss' );
			oFiles[sKey].push( grunt.option('fcCwd') + 'components/'+ oComponents[sComponent] +'/**/*_'+ sScreen + '*.scss' );
		}

		for ( var nPath = 0; nPath < aPaths.length; nPath++) {
			oFiles[sKey].push( aPaths[nPath] + '/**/*_vars*.scss');
			oFiles[sKey].push( aPaths[nPath] + '/**/*_pattern*.scss');
			oFiles[sKey].push( aPaths[nPath] + '/**/*_'+ sScreen + '*.scss');
			if ( sDevice !== undefined) {
				oFiles[sKey].push( aPaths[nPath] + '/**/*_'+ sDevice + '*.scss' );
			}
		}

		if ( sDevice !== undefined) {
			oFiles[sKey].push( grunt.option('fcCwd') + '/components/**/*_'+ sDevice + '*.scss' );
		}

		return oFiles

	}

	return oConfig;
}


