module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		oPkg = require(grunt.option('fcCwd') + '/package.json'),
		oComponents = oData.components !== undefined ? oData.components : oPkg.components;

	function getComponentsJs() {

		var oFiles = [];

		for (var nKey = 0; nKey < oComponents.length; nKey++) {

			oFiles.push( {
				expand: true,
				cwd: grunt.option('fcCwd') + '/' +  oData.bower.cwd + '/'+ oComponents[nKey] + '/js/',
				src: ['*.js','!_*.js'],
				dest: grunt.option('appCwd') + '/' +  oData.js.dest + '/ui',
				preserveComments: false,
				beautify: true
			} );
		}

		return oFiles;
	}

	var oCore = {
		options: {
			preserveComments: false,
			beautify: false
		},
		files: {}
	};

	oCore.files[ grunt.option('appCwd') + '/' + oData.js.dest + '/frontendcore.js'] = [
		grunt.option('fcCwd') + '/components/essence/src/js/libs/modernizr-custom.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/build/TinyCore.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/src/tools/mediator/TinyCore.Toolbox.Mediator.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.js',
		grunt.option('fcCwd') + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.domBoot.js',
		grunt.option('fcCwd') + '/bower/jquery/dist/jquery.js',
		grunt.option('fcCwd') + '/components/essence/js/_namespace.js',
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
		grunt.option('fcCwd') + '/components/essence/js/_modules-config.js',
		grunt.option('fcCwd') + '/components/essence/js/_init.js'
	];

	var oRoundTrip = {
		options: {
			preserveComments: false,
			beautify: false
		},
		files: {}
	};

	oRoundTrip.files[ grunt.option('appCwd') + '/' + oData.js.dest + '/roundtrip.js' ] = [
		grunt.option('fcCwd') + '/bower/twig.js/twig.js',
		grunt.option('fcCwd') + '/components/roundtrip/js/_roundtrip.js'
	];


	return {
		core: oCore,
		rountrip: oRoundTrip,
		components: {
			files: getComponentsJs()
		}
	}

}