var pkg = require('../package.json');

module.exports =  {
	options : {
		allowEmpty: true,
		verbose: true
	},
	scss: {
		options: {
			cwd: "./../scss/",
			message: pkg.lastFeature + " v" + pkg.version
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
			message: pkg.lastFeature + " v" + pkg.version
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
			message: pkg.lastFeature + " v" + pkg.version
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