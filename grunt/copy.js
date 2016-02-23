module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		jsCwd = grunt.option('appCwd') +'/',
		jsSrc = '**/*.js',
		jsModulesFolder,
		oConfig = {
			Polyfills: {
				files: [
					{
						cwd: grunt.option('fcCwd') +'/_resources/polyfills/',
						expand: true,
						flatten: false,
						src: ['**/*.*'],
						dest: grunt.option('fcCwd') +'/build/static/js/shims'
					}
				]
			},
			static: {
				files: [
					{
						cwd: grunt.option('fcCwd') +'/_resources/static/',
						expand: true,
						flatten: false,
						src: ['**/*.*'],
						dest: grunt.option('fcCwd') +'/build/static/'
					}
				]
			}
		};


	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	if ( oData.js !== undefined) {

		if (oData.js.cwd !== undefined) {
			jsCwd += oData.js.cwd + '/';
		}

		jsModulesFolder =  grunt.option('appCwd') +'/'+ oData.js.dest +'/';

		if (  oData.js.modulesFolder !== undefined ) {
			jsModulesFolder += oData.js.modulesFolder + '/';
		} else {
			jsModulesFolder += 'modules/';
		}
	}

	oConfig['js'] = {
		files: [
			{
				cwd: jsCwd,
				expand: true,
				flatten: true,
				src: [jsSrc],
				dest:jsModulesFolder
			}
		]
	};

	return oConfig;

}