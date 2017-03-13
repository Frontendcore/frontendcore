module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var aFiles = [
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

	if ( Object.prototype.toString.call(oData.js.cwd) === '[object Array]') {

		for (var i = 0; i < oData.js.cwd.length; i++) {
			aFiles.push(oData.js.cwd[i] + '/**/*.js');
		}

        oConfig['files'] = {
			src:  aFiles
        };

	}
	else if ( jsCwd !== '') {

		aFiles.push(jsCwd + '/**/*.js');

		oConfig['files'] = aFiles;
	}

	return oConfig;

}