module.exports = function(grunt) {
	grunt.initConfig({
		scss: {
			options: {
				cwd: "css/core/",
				remote: "origin",
				branch: "master"
			}
		},
		js: {
			options: {
				cwd: "build/static/js/",
				remote: "origin",
				branch: "master"
			}
		},
		workspace: {
			options: {
				cwd: "",
				remote: "origin",
				branch: "master"
			}
		}
	});
};