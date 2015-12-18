module.exports = function (grunt) {

	var pkg = require( grunt.option('pathPKG')),
		fc = require( grunt.option('pathJSON') + '/frontendcore.json');

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

	grunt.registerTask('rebuild', ['grunt:rebuild']);
	grunt.registerTask('css', ['grunt:css']);

	grunt.registerTask('js', ['grunt:js']);
	grunt.registerTask('html', ['twigRender']);

	grunt.registerTask('build', ['js','css','html']);
	grunt.registerTask('default', ['js','css']);


	// GIT TASKS
	for ( var nKey = 0; nKey < fc.components.length; nKey ++ ) {
		grunt.registerTask('push:' + fc.components[nKey], ['gitadd:' + fc.components[nKey],'gitcommit:' + fc.components[nKey],'gitpush:' + fc.components[nKey]]);
		grunt.registerTask('release:' + fc.components[nKey], ['gitadd:' + fc.components[nKey],'gitcommit:' + fc.components[nKey],'gittag:' + fc.components[nKey],'gitpush:' + fc.components[nKey]]);
		grunt.registerTask('update:' + fc.components[nKey], ['gitpull:' + fc.components[nKey]]);
		grunt.registerTask('checkout:' + fc.components[nKey], ['gitcheckout:' + fc.components[nKey]]);
		grunt.registerTask('clone:' + fc.components[nKey], ['gitclone:' + fc.components[nKey] ,'update:' + fc.components[nKey] ] );
		grunt.registerTask('new:' + fc.components[nKey], ['gitclone:' + fc.components[nKey] ,'gitcheckout:' + fc.components[nKey],'replace:' + fc.components[nKey],'gitadd:' + fc.components[nKey],'gitcommit:' + fc.components[nKey],'gitpush:' + fc.components[nKey]] );
	}

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};
