module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-sass-globbing');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-twig-render');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-webfont');

	var oConfig = {},
		aTaks = ['sass','sass_globbing','postcss','twigRender','uglify','watch','clean','copy','notify','webfont','jshint'];

	for ( var nKey = 0; nKey < aTaks.length; nKey++){
		oConfig[aTaks[nKey]] = require( grunt.option('fcCwd') + '/grunt/'+ aTaks[nKey] +'.js' )(grunt);
	}

	grunt.initConfig(oConfig);

	grunt.registerTask('html', ['twigRender','notify:html']);
	grunt.registerTask('js', ['js:hint','copy:js','copy:jsForms','uglify','notify:js']);
	grunt.registerTask('js:hint', ['jshint']);
	grunt.registerTask('js:angular', ['js:hint','uglify:custom','notify:js']);
	grunt.registerTask('js:compile', ['js:hint','copy:js','notify:js']);
	grunt.registerTask('css', ['icons','sass_globbing','css:compile','copy:img']);
	grunt.registerTask('css:import', ['sass_globbing']);
	grunt.registerTask('css:one', ['sass_globbing','css:compile']);
	grunt.registerTask('css:compile', ['sass','postcss','notify:css']);
	grunt.registerTask('icons', ['webfont','notify:icons']);

	grunt.registerTask('docs', ['html']);

	grunt.registerTask('default', ['copy:Polyfills','icons','css','js','notify:all']);

	grunt.registerTask('build', ['clean','copy:Polyfills','copy:static','icons','css','js','html','notify:all']);
	grunt.registerTask('rebuild:js', ['uglify','notify:all']);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});


};
