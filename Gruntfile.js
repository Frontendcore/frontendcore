module.exports = function (grunt) {

	var fc = require( grunt.option('appCwd') + '/frontendcore.json');

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-sass-globbing');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-twig-render');
	grunt.loadNpmTasks('grunt-postcss');

	var oConfig = {},
		aTaks = ['sass','sass_globbing','postcss','twigRender','uglify'];

	for ( var nKey = 0; nKey < aTaks.length; nKey++){
		oConfig[aTaks[nKey]] = require( grunt.option('fcCwd') + '/grunt/'+ aTaks[nKey] +'.js' )(grunt);
	}

	grunt.initConfig(oConfig);

	grunt.registerTask('html', ['twigRender']);
	grunt.registerTask('js', ['uglify:components']);
	grunt.registerTask('css:compile', ['sass','postcss']);
	grunt.registerTask('css', ['sass_globbing','css:compile']);

	grunt.registerTask('default', ['css']);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});


};
