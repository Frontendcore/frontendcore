module.exports = function (grunt) {

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

	grunt.registerTask('compile', ['sass_globbing','uglify:core','js','copy']);
	grunt.registerTask('css', ['sass','postcss']);
	grunt.registerTask('js', ['uglify:components']);
	grunt.registerTask('rebuild', ['compile','js','css']);

	grunt.registerTask('default', ['sass']);

};
