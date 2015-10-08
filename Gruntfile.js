module.exports = function (grunt) {

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

    grunt.registerTask('js_newer', ['newer:uglify', 'newer:jshint']);
    grunt.registerTask('js', ['uglify', 'newer:jshint']);
	grunt.registerTask('tests', ['newer:uglify']);
	grunt.registerTask('build', ['grunt:clean_site','copy','default']);
	grunt.registerTask('twig', ['newer:twigRender']);
	grunt.registerTask('scss', [
		'sass',
		'sassdoc',
		'newer:cssmin',
		'concurrent:templates'
	]);
	grunt.registerTask('commit', [
		'version',
		'clean',
		'copy:workspace',
		'twigRender',
		'sass',
		'sassdoc',
		'newer:cssmin',
		'concurrent:templates',
		'js',
		'copy:scss',
		'copy:js',
		'copy:generator',
		'compress',
		'replace:generator',
		'gitadd:scss',
		'gitadd:js',
		'gitadd:site',
		'gitadd:generator',
		'gitcommit:scss',
		'gitcommit:js',
		'gitcommit:site',
		'gitcommit:generator',
		'gitadd:workspace',
		'gitcommit:workspace'
	]);

	grunt.registerTask('release', [
		'commit',
		'gittag',
		'gitpush',
		'githubChanges',
		'gitcommit:workspace',
		'gitpush'
	]);

	grunt.registerTask('push', [
		'commit',
		'gitpush'
	]);

	grunt.registerTask('stats', ['phantomas','gitadd:stats','gitcommit','gitpush:workspace']);


	grunt.registerTask('default', [
		'twig',
		'sass',
		'sassdoc',
		'newer:cssmin',
		'concurrent:templates',
		'js'
	]);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};
