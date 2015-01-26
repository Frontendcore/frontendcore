module.exports = {
	templates: {
		tasks: ['twig']
	},
	compileSass: {
		tasks: ['compass']
	},
	documentSass: {
		tasks: ['clean:sassdoc','sassdoc']
	}
};