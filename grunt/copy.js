module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		sModulesFolder = oData.js.modulesFolder !== undefined ? '/' + oData.js.modulesFolder : '/modules' ;

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
		js: {
			files: [
				{
					cwd: grunt.option('appCwd') +'/'+ oData.js.cwd + '/',
					expand: true,
					flatten: false,
					src: ['**/*.js'],
					dest: grunt.option('appCwd') +'/'+ oData.js.dest +'/' + sModulesFolder+ '/'
				}
			]
		},
	}

}