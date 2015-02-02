module.exports = function (grunt) {

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

    grunt.registerTask('js_newer', ['newer:uglify', 'newer:jshint','newer:jasmine']);
    grunt.registerTask('js', ['uglify', 'newer:jshint','jasmine']);
	grunt.registerTask('tests', ['newer:uglify','newer:jasmine']);
	grunt.registerTask('build', ['grunt:clean_site','copy','default']);
	grunt.registerTask('twig', ['newer:twigRender']);
	grunt.registerTask('scss', ['concurrent:compileSass', 'grunt:clean_sassdoc','sassdoc','newer:cssmin','concurrent:templates']);
	grunt.registerTask('commit', [
		'version',
		'grunt:clean_site',
		'copy:workspace',
		'twigRender',
		'scss',
		'js',
		'copy:scss',
		'copy:js',
		'gitadd:scss',
		'gitadd:js',
		'gitadd:site',
		'gitcommit:scss',
		'gitcommit:js',
		'gitcommit:site',
		'gitadd:workspace',
		'gitcommit:workspace'
	]);

	grunt.registerTask('release', [
		'commit',
		'gittag',
		'gitpush'
	]);

	grunt.registerTask('push', [
		'commit',
		'gitpush'
	]);

	grunt.registerTask('stats', ['phantomas','gitadd:stats','gitcommit','gitpush:workspace']);


	grunt.registerTask('default', ['twig','scss', 'js']);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};