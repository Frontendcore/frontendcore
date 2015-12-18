var aCoreFiles =  [
	'src/js/libs/modernizr-custom.js',
	'libs/tinycorejs/build/TinyCore.js',
	'libs/tinycorejs/src/tools/mediator/TinyCore.Toolbox.Mediator.js',
	'libs/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
	'libs/tinycorejs/src/extensions/AMD/TinyCore.AMD.js',
	'libs/tinycorejs/src/extensions/AMD/TinyCore.AMD.domBoot.js',
	'libs/jquery/dist/jquery.js',
	'src/js/namespace.js',
	'src/js/tools/_bind.js',
	'src/js/tools/_attributeToArray.js',
	'src/js/tools/_getDataModules.js',
	'src/js/tools/_isMobile.js',
	'src/js/tools/_loadCSS.js',
	'src/js/tools/_mergeJSON.js',
	'src/js/tools/_mergeOptions.js',
	'src/js/tools/_mixOptions.js',
	'src/js/tools/_removeLoading.js',
	'src/js/tools/_track-analytics.js',
	'src/js/modules-config.js',
	'src/js/init.js'
];

module.exports = function(grunt) {

	var oData = require('../../../frontendcore.json'),
		sRelativePath = oData.relative_path ? oData.relative_path : '../..';


	function getComponentsJs() {

		var oComponents = [];

		for (var nKey = 0; nKey < oData.components.length; nKey++) {

			oComponents.push( {
				expand: true,
				cwd: sRelativePath + '/' +  oData.bower.cwd + '/'+ oData.components[nKey] + '/dist/js/',
				src: '*.js',
				dest: sRelativePath + '/' +  oData.js.dest,
				preserveComments: false,
				beautify: true,
			} );
		}

		return oComponents;
	}

	return {
		core: {
			options: {
				preserveComments: false,
				beautify: false
			},
			files: {
				'dist/js/frontendcore.js' : aCoreFiles
			}
		},
		components: {
			files: getComponentsJs()
		}

	}

}