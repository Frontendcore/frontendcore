var oData,
	configBase = function( sComponent, grunt) {
		var sRouteComponent = "components/" + sComponent + "/",
			sBowerPath = sRouteComponent + 'bower.json',
			oDataComponent = grunt.file.exists(sBowerPath) ? require( "../" + sBowerPath) : { version: "0.0.1", lastFeature: "none" },
			oBaseConfig = {
				options: {
					cwd: sRouteComponent,
					tag: oDataComponent.version,
					message: "Tag version " + oDataComponent.version,
					force: true
				},
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

	oData = require( grunt.option('pathJSON') + '/frontendcore.json' );

	return configComponent(grunt);
};