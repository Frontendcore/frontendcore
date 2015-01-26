module.exports = function(grunt) {
	grunt.initConfig({
		options: {
			base: 'package.json'
		},
		files: ['bower.json', 'build/static/js/bower.json', 'css/core/bower.json']
	});
};