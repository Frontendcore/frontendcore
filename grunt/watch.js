module.exports = function(grunt) {

	require(fcCwd + "/grunt/_data.js")(grunt);
	require(fcCwd + "/grunt/_tools.js")(grunt);

	if (oData !== undefined) {

		if (grunt.option('project')) {
			oData = oData[grunt.option('project')];
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
				files: [
					appCwd + '/components/**/*.scss',
					appCwd + '/' + scssCwd + 'components/**/*.scss',
					appCwd + '/' + scssCwd + '/**/*.scss'
				],
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
