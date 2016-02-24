module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	return {
		options: {
			force: true
		},
		build: {
			src: [ fcCwd +'/build/*']

		}
	}
}
