module.exports = function(grunt) {
	grunt.initConfig({
		options: {
			globals: {
				console: true
			}
		},
		dist: ['Gruntfile.js', 'js/core/**/*.js', 'js/ui/**/*.js']
	});
};