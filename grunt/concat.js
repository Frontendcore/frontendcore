var pkg = require('../package.json'),
	configBase = function( sComponent, grunt ) {

		var oBaseConfig = {
				src: [ 'components/' + sComponent + '/js/src/**/*.js'],
				dest: 'components/' + sComponent + '/js/dist/'+ sComponent + '.js',
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