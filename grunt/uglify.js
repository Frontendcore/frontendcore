module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json');


	function getComponentsJs() {

		var oComponents = [];

		if (oData.components !== undefined) {

			for (var nKey = 0; nKey < oData.components.length; nKey++) {

				oComponents.push( {
					expand: true,
					cwd: grunt.option('fcCwd') + '/' +  oData.bower.cwd + '/'+ oData.components[nKey] + '/dist/js/',
					src: '*.js',
					dest: grunt.option('appCwd') + '/' +  oData.js.dest,
					preserveComments: false,
					beautify: true
				} );
			}

		}

		return oComponents;
	}

	var oCore = {
		options: {
			preserveComments: false,
			beautify: false
		},
		files: {}
	}

	oCore.files[ grunt.option('fcCwd') + '/dist/js/frontendcore.js'] = [
		grunt.option('fcCwd') + '/components/essence/src/js/libs/modernizr-custom.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/build/TinyCore.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/src/tools/mediator/TinyCore.Toolbox.Mediator.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.domBoot.js',
		grunt.option('fcCwd') + '/bower/jquery/dist/jquery.js',
		grunt.option('fcCwd') + '/components/essence/js/namespace.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_bind.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_attributeToArray.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_getDataModules.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_isMobile.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_loadCSS.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_mergeJSON.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_mergeOptions.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_mixOptions.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_removeLoading.js',
		grunt.option('fcCwd') + '/components/essence/js/tools/_track-analytics.js',
		grunt.option('fcCwd') + '/components/essence/js/modules-config.js',
		grunt.option('fcCwd') + '/components/essence/js/init.js'
	];

	return {
		core: oCore,
		components: {
			files: getComponentsJs()
		}

	}

}