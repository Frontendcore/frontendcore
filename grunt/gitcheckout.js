var pkg = require('../package.json'),
	configBase = function( sComponent, grunt ) {

		var bCreate = grunt.option( "create" ) ? true : false;

		if ( !grunt.option( "create" ) && !grunt.option( "branch" ) ) {
			bCreate = true;
		}


		var sRouteComponent = "components/" + sComponent + "/",
			oBaseConfig = {
				options: {
					cwd: sRouteComponent,
					create: bCreate,
					branch: grunt.option( "branch" ) ? grunt.option( "branch" ) : "master"
				}
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

