module.exports = function(grunt) {
	return {
		Polyfills: {
			files: [
				{
					cwd: grunt.option('fcCwd') +'/_resources/polyfills/',
					expand: true,
					flatten: false,
					src: ['**/*.*'],
					dest: grunt.option('fcCwd') +'/build/static/js/shims'
				}
			]
		},
		static: {
			files: [
				{
					cwd: grunt.option('fcCwd') +'/_resources/static/',
					expand: true,
					flatten: false,
					src: ['**/*.*'],
					dest: grunt.option('fcCwd') +'/build/static/'
				}
			]
		},
	}

}