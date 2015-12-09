module.exports = {
	js: {
		files: ['components/**/*.js'],
		tasks: ['js']
	},
	scss: {
		files: ['components/**/*.scss','scss/**/*.scss','!scss/**/_components*.scss','scss/**/*.scss'],
		tasks: ['css:fast']
	},
	html: {
		files: ['twig/*.*'],
		tasks: ['html']
	}
};
