module.exports = {
	templates: {
		tasks: ['twig']
	},
	compileSass: {
		tasks: ['compass:css']
	},
	compileAllSass: {
		tasks: ['compass:css','compass:skins']
	},
};
