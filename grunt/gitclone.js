var pkg = require('../package.json'),
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

		for (var nKey = 0; nKey < pkg.components.length; nKey++){

			oConfig[pkg.components[nKey]] = configBase(pkg.components[nKey]);
		}

		return oConfig;
	};

module.exports = configComponent();
