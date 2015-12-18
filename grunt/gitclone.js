var oData,
	configBase = function( sComponent ) {
		var oBaseConfig = {
			options: {
				repository: 'https://github.com/Frontendcore/' + sComponent + '.git',
				directory: sComponent
			}
		};

		return oBaseConfig;
	},
	configComponent = function() {

		var oConfig = {
			options: {
				verbose: true,
				all: true,
				force: false,
				cwd: 'components/'
			}
		};

		for (var nKey = 0; nKey < oData.components.length; nKey++){

			oConfig[oData.components[nKey]] = configBase(oData.components[nKey]);
		}

		return oConfig;
	};

module.exports = function(grunt) {

	oData = require( grunt.option('pathJSON') + '/frontendcore.json' );

	return configComponent(grunt);
};
