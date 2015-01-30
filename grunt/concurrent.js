module.exports = {
	templates: {
		tasks: ['twig']
	},
	compileSass: {
		tasks: ['compass']
	},
	documentSass: {
		tasks: ['grunt:clean_sassdoc','sassdoc']
	}
};