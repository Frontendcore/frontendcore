module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		aBrowsers =  oData.scss.browsers !== undefined ? oData.scss.browsers : ["last 1 version"] ;

	return {
		options: {
			processors: [
				require(grunt.option('fcCwd') + '/node_modules/autoprefixer/lib/autoprefixer')({ browsers: aBrowsers }),
				require(grunt.option('fcCwd') + '/node_modules/cssnext/dist/index')(),
				require(grunt.option('fcCwd') + '/node_modules/precss/index')()
			]
		},
		dist: {
			src: grunt.option('appCwd') + '/' + oData.scss.dest + '/*.css'
		}
	}
}
