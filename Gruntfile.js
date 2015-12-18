module.exports = function (grunt) {

	var fc = require( grunt.option('pathJSON') + '/frontendcore.json');


	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-grunt');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-twig-render');

	var oConfig = {};

	oConfig['grunt'] = require( grunt.option('path') + '/grunt/grunt.js' )(grunt);
	oConfig['gitpull'] = require( grunt.option('path') + '/grunt/gitpull.js' )(grunt);
	oConfig['gitclone'] = require( grunt.option('path') + '/grunt/gitclone.js' )(grunt);
	oConfig['sass'] = require( grunt.option('path') + '/grunt/sass.js' )(grunt);

	grunt.initConfig(oConfig);

	grunt.registerTask('rebuild', ['grunt:rebuild']);
	grunt.registerTask('css', ['grunt:css']);

	grunt.registerTask('js', ['grunt:js']);
	grunt.registerTask('update', ['gitpull']);
	grunt.registerTask('html', ['twigRender']);

	grunt.registerTask('build', ['js','css','html']);
	//grunt.registerTask('default', ['js','css']);
	grunt.registerTask('default', ['sass']);

	console.log('FUNCIONA');


	if ( fc.components !== undefined) {

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
	}


};
