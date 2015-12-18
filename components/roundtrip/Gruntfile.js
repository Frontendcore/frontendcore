module.exports = function (grunt) {

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

	grunt.registerTask('default', ['jshint','uglify']);

};
