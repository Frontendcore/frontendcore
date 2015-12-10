var pkg = require('./package.json');

module.exports = function (grunt) {

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

	grunt.registerTask('rebuild', ['grunt:rebuild']);
	grunt.registerTask('css', ['grunt:css']);

	grunt.registerTask('js', ['grunt:js']);
	grunt.registerTask('html', ['twigRender']);


	grunt.registerTask('default', ['js','css','html']);


// GIT TASKS
	for ( var nKey = 0; nKey < pkg.components.length; nKey ++ ) {
		grunt.registerTask('push:' + pkg.components[nKey], ['gitadd:' + pkg.components[nKey],'gitcommit:' + pkg.components[nKey],'gitpush:' + pkg.components[nKey]]);
		grunt.registerTask('release:' + pkg.components[nKey], ['gitadd:' + pkg.components[nKey],'gitcommit:' + pkg.components[nKey],'gittag:' + pkg.components[nKey],'gitpush:' + pkg.components[nKey]]);
		grunt.registerTask('update:' + pkg.components[nKey], ['gitpull:' + pkg.components[nKey]]);
		grunt.registerTask('checkout:' + pkg.components[nKey], ['gitcheckout:' + pkg.components[nKey]]);
		grunt.registerTask('clone:' + pkg.components[nKey], ['gitclone:' + pkg.components[nKey] ,'update:' + pkg.components[nKey] ] );
		grunt.registerTask('new:' + pkg.components[nKey], ['gitclone:' + pkg.components[nKey] ,'gitcheckout:' + pkg.components[nKey],'replace:' + pkg.components[nKey],'gitadd:' + pkg.components[nKey],'gitcommit:' + pkg.components[nKey],'gitpush:' + pkg.components[nKey]] );
	}

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};
