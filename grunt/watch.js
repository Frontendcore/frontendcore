module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json');

	return {
		js: {
			files: [
				grunt.option('appCwd') + '/'+ oData.js.cwd + '/*.js',
				grunt.option('appCwd') + '/components/**/*.js'
			],
			tasks: ['js']
		},
		scss: {
			files: [
				grunt.option('appCwd') + '/components/**/*.scss',
				grunt.option('appCwd') + '/'+ oData.scss.cwd + 'components/**/*.scss',
				grunt.option('appCwd') + '/'+ oData.scss.cwd + '/**/*.scss'
			],
			tasks: ['css:compile']
		},
		html: {
			files: [
				grunt.option('fcCwd') + '/twig/**/*.*',
				grunt.option('fcCwd') + '/_resources/bbdd/sections.json'
			],
			tasks: ['html']
		}
	};
}
