module.exports = function(grunt) {

	require(fcCwd + "/grunt/_data.js")(grunt);

	if (oData !== null) {

		var oScssFiles = [
			appCwd + '/components/**/*.scss',
			scssCwd + '/components/**/*.scss',
			scssCwd + '/**/*.scss'
		];

        if ( oData.scss !== undefined && oData.scss.cwd !== undefined &&  Object.prototype.toString.call(oData.scss.cwd) === '[object Array]') {
            for (var nKey = 0; nKey < oData.scss.cwd.length; nKey++) {
				oScssFiles.push(getRelativePath(oData.scss.cwd[nKey] + '/**/*.scss'));
            }
        }

		return {
			js: {
				files: [
					jsCwd +  '/*.js',
					appCwd + '/components/**/*.js'
				],
				tasks: ['js']
			},
			scss: {
				files: oScssFiles,
				tasks: ['css:compile']
			},
			html: {
				files: [
					appCwd + '/components/**/*.html',
					fcCwd + '/twig/**/*.*',
					fcCwd + '/_resources/bbdd/sections.json'
				],
				tasks: ['html']
			}
		};
	}
}
