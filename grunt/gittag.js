var pkg = require('../package.json');

module.exports = {
		scss: {
			options: {
				cwd: "css/core/",
				tag: pkg.version,
				message: "Tag version " + pkg.version
			}
		},
		js: {
			options: {
				cwd: "build/static/js",
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