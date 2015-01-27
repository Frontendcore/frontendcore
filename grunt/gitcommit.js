var pkg = require('../package.json');

module.exports =  {
	options : {
		allowEmpty: true,
		verbose: true
	},
	scss: {
		options: {
			cwd: "css/core/",
			message: "Release version " + pkg.version
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
			message: "Release version " + pkg.version
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
			message: "Release version " + pkg.version
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