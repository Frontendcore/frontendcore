module.exports = {
	scripts_newer: {
		files: ['js/ui/**/*.js', 'Gruntfile.js'],
			tasks: ['js_newer']
	},
	scripts: {
		files: ['js/core/**/*.js','js/tools/**/*.js','js/base/**/*.js', 'js/libs/**/*.js'],
		tasks: ['js']
	},
	tests: {
		files: ['tests/**/*.js'],
			tasks: ['tests']
	},
	scss: {
		files: ['css/**/*.scss'],
			tasks: ['scss']
	},
	twig: {
		files: ['twig/**/*.twig','!twig/_**/*.twig'],
			tasks: ['twig']
	},
	twigPartials: {
		files: ['twig/**/*.html','database.json','twig/_**/*.twig'],
		tasks: ['twigRender']
	},
	static: {
		files: ['static/**/*'],
		tasks: ['copy']
	}
};