var pkg = require('../package.json'),
		configBase = function( sComponent, grunt ) {

			var oBaseConfig = {
				files: [{
					expand: true,
					cwd: 'components/'+ sComponent + '/dist/js/',
					src: '*.js',
					dest: 'build/static/js/',
					preserveComments: false,
					beautify: true,
				}]
			};

			return oBaseConfig;
		},
		configComponent = function(grunt) {

			var oConfig = {};

			for (var nKey = 0; nKey < pkg.components.length; nKey++) {
				oConfig[pkg.components[nKey]] = configBase(pkg.components[nKey], grunt);
			}

			return oConfig;
		};

module.exports = function(grunt) {

	return configComponent(grunt);
};