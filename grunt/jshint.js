module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		jsCwd = grunt.option('appCwd') +'/',
		aFiles = [
			grunt.option('fcCwd') + 'Gruntfile.js',
			grunt.option('fcCwd') + '/components/**/js/*.js',
			'!' + grunt.option('fcCwd') + '/components/**/js/roundtrip.js',
			'!' + grunt.option('fcCwd') + '/components/**/libs/**/*.js',
			'!' + grunt.option('fcCwd') + '/components/**/dist/**/*.js',
		],
		oConfig = {
			options: {
				globals: {
					console: true
				}
			}
		};


	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	if ( oData.js !== undefined) {

		if (oData.js.cwd !== undefined) {
			jsCwd += oData.js.cwd + '/**/*.js';
		}

	}

	aFiles.push(jsCwd);

	oConfig['files'] = aFiles;

	return oConfig;

}