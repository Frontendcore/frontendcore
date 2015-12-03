var pkg = require('./package.json');

module.exports = function (grunt) {

	require('load-grunt-config')(grunt);

	require('jit-grunt')(grunt);

	grunt.registerTask('scss', ['sass_import','sass','copy']);
	grunt.registerTask('js', ['concat','uglify']);

	grunt.registerTask('default', ['js','scss']);


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
