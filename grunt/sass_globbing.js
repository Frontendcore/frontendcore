module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		oPkg = require(grunt.option('fcCwd') + '/package.json');


	function getRoutes( sScreen, sDevice ) {

		sScreen = sScreen !== undefined ? sScreen : 'main';

		var oFiles = {},
			appPath =  grunt.option('appCwd') + '/' +  oData.scss.cwd,
			sKey = appPath + '/_components_' + sScreen + '.scss',
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

		oFiles[sKey].push( appPath + '/**/*_vars*.scss');
		oFiles[sKey].push( appPath + '/**/*_pattern*.scss');
		oFiles[sKey].push( appPath + '/**/*_'+ sScreen + '*.scss');

		if ( sDevice !== undefined) {
			oFiles[sKey].push( grunt.option('fcCwd') + '/components/**/*_'+ sDevice + '*.scss' );
			oFiles[sKey].push( appPath + '/components/**/*_'+ sDevice + '*.scss' );
		}

		return oFiles

	}

	return  {
		main : {
			files: getRoutes('main')
		},
		screenXXXL: {
			files: getRoutes('screen-xxxl','desktop')
		},
		screenXXL: {
			files: getRoutes('screen-xxl','desktop')
		},
		screenXL: {
			files: getRoutes('screen-xl','desktop')
		},
		screenL: {
			files: getRoutes('screen-l','tablet')
		},
		screenM: {
			files: getRoutes('screen-m','mobile')
		},
		screenS: {
			files: getRoutes('screen-s','mobile')
		},
		screenXS: {
			files: getRoutes('screen-xs','mobile')
		},
	}
}


