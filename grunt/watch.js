module.exports = function(grunt) {

	require(fcCwd + "/grunt/_data.js")(grunt);

	if (oData !== null) {

		var oScssFiles = [
				appCwd + '/components/**/*.scss',
				scssCwd + '/components/**/*.scss',
				scssCwd + '/**/*.scss'
			],
			oJsFiles = [
				jsCwd +  '/**/*.js',
			];

        if ( oData.scss !== undefined && oData.scss.cwd !== undefined &&  Object.prototype.toString.call(oData.scss.cwd) === '[object Array]') {
            for (var nKey = 0; nKey < oData.scss.cwd.length; nKey++) {
				oScssFiles.push(getRelativePath(oData.scss.cwd[nKey] + '/**/*.scss'));
            }
        }

		if ( oData.js !== undefined && oData.js.cwd !== undefined &&  Object.prototype.toString.call(oData.js.cwd) === '[object Array]') {
			for (var nKey = 0; nKey < oData.js.cwd.length; nKey++) {

				var sPathTemp = getRelativePath(oData.js.cwd[nKey] + '**/*.js');

				if ( sPathTemp !=  fcCwd + 'components/**/*.js') {
					oJsFiles.push();
				}
			}
		}
		
		return {
			jsCore: {
				files: fcCwd + 'components/**/*.js',
				tasks: ['js']
			},
			js: {
				files: oJsFiles,
				tasks: ['js:compile']
			},
			scss: {
				files: oScssFiles,
				tasks: ['css:compile']
			},
			html: {
				files: [
					fcCwd + '/components/**/*.html',
					fcCwd + '/twig/**/*.*',
					fcCwd + '/_resources/bbdd/sections.json'
				],
				tasks: ['html']
			}
		};
	}
}
