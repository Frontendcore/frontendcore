var pkg = require('../package.json');

module.exports = {
		scss: {
			options: {
				cwd: "./../scss/",
				tag: pkg.version,
				message: "Tag version " + pkg.version
			}
		},
		js: {
			options: {
				cwd: "./../js/",
				tag: pkg.version,
				message: "Tag version " + pkg.version
			}
		},
		site: {
			options: {
				cwd: "./../site/build/",
				tag: pkg.version,
				message: "Tag version " + pkg.version
			}
		},
		generator: {
			options: {
				cwd: "./../generator/",
				tag: pkg.version,
				message: "Tag version " + pkg.version
			}
		},
		workspace: {
			options: {
				cwd: "",
				tag: pkg.version,
				message: "Tag version " + pkg.version
			}
		}
};