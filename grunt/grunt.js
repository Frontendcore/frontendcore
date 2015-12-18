var oData,
	configBase = function( sComponent, grunt ) {

		var oBaseConfig = {
			gruntfile: 'components/' + sComponent + '/gruntfile.js',
			tasks: ['default']
		};

		return oBaseConfig;
	},
	configComponent = function(grunt) {

		var oConfig = {};

		for (var nKey = 0; nKey < oData.components.length; nKey++) {
			oConfig[oData.components[nKey]] = configBase(oData.components[nKey], grunt);
		}

		return oConfig;
	};

module.exports = function(grunt) {

	oData = require( grunt.option('pathJSON') + '/frontendcore.json' );

	return {
		css : {
			gruntfile: 'components/essence/gruntfile.js',
			tasks: ['css']
		},
		rebuild : {
			gruntfile: 'components/essence/gruntfile.js',
			tasks: ['rebuild']
		},
		js : {
			gruntfile: 'components/essence/gruntfile.js',
			tasks: ['js']
		}
	};
};
