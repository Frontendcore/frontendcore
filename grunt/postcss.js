module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		scssSrc = '*.css';

	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	var	aBrowsers =  oData.scss.browsers !== undefined ? oData.scss.browsers : ["last 1 version"],
		scssDest = grunt.option('scssDest') !== undefined ? grunt.option('scssDest') : oData.scss.dest;

	return {
		options: {
			processors: [
				require(grunt.option('fcCwd') + '/node_modules/cssnext/dist/index')({ browsers: aBrowsers }),
				require(grunt.option('fcCwd') + '/node_modules/precss/index')()
			]
		},
		dist: {
			src: grunt.option('appCwd') + '/' + scssDest + '/' + scssSrc
		}
	}
}
