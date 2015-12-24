module.exports = function(grunt) {
	return {
		options: {
			force: true
		},
		build: {
			src: [ grunt.option('fcCwd') +'/build/*']

		}
	}
}
