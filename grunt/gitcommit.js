var pkg = require('../package.json');

module.exports =  {
	version: {
		scss: {
			options: {
				cwd: "css/core/",
				message: "Release version " + pkg.version
			},
			files: [
				{
					src: ["bower.json"],
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
					src: ["bower.json"],
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
					src: ["package.json", "bower.json", "Gruntfile.js", "css/core/", "build/static/js/", "build"],
					expand: true,
					cwd: "./"
				}
			]
		}
	},
	stats: {
		options: {
			cwd: "./",
			message: "Stats updated for version " + pkg.version
		},
		files: [
			{
				src: ["build/metrics"],
				expand: true,
				cwd: "./"
			}
		]
	}
};