var pkg = require('../package.json'),
		configBase = function( sComponent, grunt ) {

			var oBaseConfig = {
				gruntfile: 'components/' + sComponent + '/gruntfile.js',
				tasks: ['default']
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

	return {
		css : {
			gruntfile: 'components/essence/gruntfile.js',
			tasks: ['css']
		},
		rebuild : {
			gruntfile: 'components/essence/gruntfile.js',
			tasks: ['rebuild']
		}
	};
};