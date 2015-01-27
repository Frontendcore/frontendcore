module.exports = function (grunt) {

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

    grunt.registerTask('js', ['newer:uglify', 'newer:jshint','newer:jasmine']);
	grunt.registerTask('tests', ['newer:uglify','newer:jasmine']);
	grunt.registerTask('twig', ['newer:twigRender']);
	grunt.registerTask('release', ['version','default','gitadd','gitcommit:version','gittag','gitpush']);
	grunt.registerTask('stats', ['phantomas','gitadd:workspace','gitcommit:stats','gitpush:workspace']);
	grunt.registerTask('scss', ['concurrent:compileSass', 'concurrent:documentSass','newer:cssmin','concurrent:templates']);
	grunt.registerTask('log', ['clean:changelog','changelog','stencil']);

	grunt.registerTask('default', ['twig','scss', 'js']);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};