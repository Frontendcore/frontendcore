module.exports = function(grunt) {
	grunt.initConfig({
		stats: {
			options: {
				force: true
			},
			files: {
				src: ['build/metrics']
			}
		}
	});
};