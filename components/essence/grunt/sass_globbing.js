module.exports = function(grunt) {

	var oData = require('../../../frontendcore.json'),
		sRelativePath = oData.relative_path ? oData.relative_path : '../..',
		sPathComponent = oData.bower.cwd;


	function getRoutes( sScreen, sDevice ) {

		sScreen = sScreen !== undefined ? sScreen : 'main';

		var oComponents = {},
			sKey = sRelativePath + '/' +  oData.scss.cwd + '/_components_' + sScreen + '.scss';

		oComponents[sKey] = [
			'../../components/**/*_vars*.scss',
			'../../components/**/*_pattern*.scss',
			'../../components/**/*_'+ sScreen + '*.scss'

		];

		if ( sDevice !== undefined) {
			oComponents[sKey].push( '../../components/**/*_'+ sDevice + '*.scss' )
		}

		return oComponents

	}

	return  {
		main : {
			files: getRoutes()
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


