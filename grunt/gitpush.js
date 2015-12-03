var pkg = require('../package.json'),
	configBase = function( sComponent, grunt ) {
		var sRouteComponent = "components/" + sComponent + "/",
			oBaseConfig = {
				options: {
					cwd: sRouteComponent,
					remote: "origin",
					branch: grunt.option( "branch" ) ? grunt.option( "branch" ) : "master",
					tags: true,
					force: true
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

		for (var nKey = 0; nKey < pkg.components.length; nKey++){

			oConfig[pkg.components[nKey]] = configBase(pkg.components[nKey], grunt);
		}

		return oConfig;
	};

module.exports = function(grunt) {
	return configComponent(grunt);
};

