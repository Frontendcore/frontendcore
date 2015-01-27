var pkg = require('../package.json');

module.exports =  {
	options : {
		allowEmpty: true,
		verbose: true
	},
	scss: {
		options: {
			cwd: "css/core/",
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
			cwd: "build/static/js/",
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