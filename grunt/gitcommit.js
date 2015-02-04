var pkg = require('../package.json');

module.exports =  {
	options : {
		allowEmpty: true,
		verbose: true
	},
	scss: {
		options: {
			cwd: "./../scss/",
			message: pkg.lastFeature.replace('%v%', 'Release version' + pkg.version)
		},
		files: [
			{
				src: ["./"],
				expand: true
			}
		]
	},
	js: {
		options: {
			cwd: "./../js/",
			message: pkg.lastFeature.replace('%v%', 'Release version' + pkg.version)
		},
		files: [
			{
				src: ["./"],
				expand: true
			}
		]
	},
	site: {
		options: {
			cwd: "./../site/build/",
			message: pkg.lastFeature.replace('%v%', 'Release version' + pkg.version)
		},
		files: [
			{
				src: ["./"],
				expand: true
			}
		]
	},
	generator: {
		options: {
			cwd: "./../generator/",
			message: pkg.lastFeature.replace('%v%', 'Release version' + pkg.version)
		},
		files: [
			{
				src: ["./"],
				expand: true
			}
		]
	},
	workspace: {
		options: {
			cwd: "./",
			message: pkg.lastFeature.replace('%v%', 'Release version' + pkg.version)
		},
		files: [
			{
				src: ["./"],
				expand: true,
				cwd: "./"
			}
		]
	}
};