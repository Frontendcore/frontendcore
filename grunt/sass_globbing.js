module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json');


	function getRoutes( sScreen, sDevice ) {

		sScreen = sScreen !== undefined ? sScreen : 'main';

		var oComponents = {},
			appPath =  grunt.option('appCwd') + '/' +  oData.scss.cwd,
			sKey = appPath + '/_components_' + sScreen + '.scss';

		oComponents[sKey] = [
			grunt.option('fcCwd') + '/components/**/_fc-'+ sScreen +'_essence.scss',
			grunt.option('fcCwd') + '/components/**/*_vars*.scss',
			grunt.option('fcCwd') + '/components/**/*_pattern*.scss',
			grunt.option('fcCwd') + '/components/**/*_'+ sScreen + '*.scss',
			appPath + '/components/**/*_vars*.scss',
			appPath + '/components/**/*_pattern*.scss',
			appPath + '/components/**/*_'+ sScreen + '*.scss'

		];

		if ( sDevice !== undefined) {
			oComponents[sKey].push( grunt.option('fcCwd') + '/components/**/*_'+ sDevice + '*.scss' )
			oComponents[sKey].push( appPath + '/components/**/*_'+ sDevice + '*.scss' )
		}

		return oComponents

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


