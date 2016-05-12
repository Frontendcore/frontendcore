module.exports = function(grunt) {

	require(fcCwd + "/grunt/_data.js")(grunt);

	if (oData !== null) {

		console.log(jsCwd);

		var oScssFiles = [
				appCwd + '/components/**/*.scss',
				scssCwd + '/components/**/*.scss',
				scssCwd + '/**/*.scss'
			],
			oJsFiles = [
				jsCwd +  '/**/*.js',
				appCwd + '/components/**/*.js',
			];

        if ( oData.scss !== undefined && oData.scss.cwd !== undefined &&  Object.prototype.toString.call(oData.scss.cwd) === '[object Array]') {
            for (var nKey = 0; nKey < oData.scss.cwd.length; nKey++) {
				oScssFiles.push(getRelativePath(oData.scss.cwd[nKey] + '/**/*.scss'));
            }
        }

		if ( oData.js !== undefined && oData.js.cwd !== undefined &&  Object.prototype.toString.call(oData.js.cwd) === '[object Array]') {
			for (var nKey = 0; nKey < oData.js.cwd.length; nKey++) {
				oJsFiles.push(getRelativePath(oData.js.cwd[nKey] + '/**/*.js'));
			}
		}

		return {
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
					appCwd + '/components/**/*.html',
					fcCwd + '/twig/**/*.*',
					fcCwd + '/_resources/bbdd/sections.json'
				],
				tasks: ['html']
			}
		};
	}
}
