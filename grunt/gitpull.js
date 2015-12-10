var oData = require('../frontendcore.json'),
	configBase = function( sComponent, grunt ) {
		var sRouteComponent = "components/" + sComponent + "/",
			oBaseConfig = {
				options: {
					cwd: sRouteComponent,
					remote: "origin",
					branch: "master"
				}
			};

		return oBaseConfig;
	},
	configComponent = function(grunt) {

		var oConfig = {
			options : {
				allowEmpty: true,
				verbose: true
			}
		};

		for (var nKey = 0; nKey < oData.components.length; nKey++){

			oConfig[oData.components[nKey]] = configBase(oData.components[nKey], grunt);
		}

		return oConfig;
	};

module.exports = function(grunt) {
	return configComponent(grunt);
};

