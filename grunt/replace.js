var pkg = require('../package.json'),
	configBase = function( sComponent, grunt ) {

		var oBaseConfig = {
				options: {
					cwd: "./",
					patterns: [
						{
							match: 'component',
							replacement: sComponent
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ['_resources/templates/bower.json'],
						dest: 'components/' + sComponent + '/'
					}
				]
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