module.exports = function (grunt) {

	require('load-grunt-config')(grunt);
	require('load-grunt-tasks')(grunt, { pattern: ['!grunt-lib-phantomjs', '!bower']});

    grunt.registerTask('js', ['uglify:core', 'jshint','jasmine']);
	grunt.registerTask('tests', ['uglify:tests','jasmine']);
	grunt.registerTask('twig', ['twigRender']);
	grunt.registerTask('release', ['version','default','gitcommit:version','gitsush','gittag']);
	grunt.registerTask('stats', ['phantomas','gitadd:stats','gitcommit:stats','gitpush:workspace']);
	grunt.registerTask('scss', ['compass', 'clean:sassdoc','sassdoc','cssmin','twig']);
	grunt.registerTask('log', ['clean:changelog','changelog','stencil']);

	grunt.registerTask('default', ['twig','scss', 'js']);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};