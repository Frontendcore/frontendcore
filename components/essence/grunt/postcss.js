module.exports = function(grunt) {

	var oData = require('../../../frontendcore.json'),
		sRelativePath = oData.relative_path ? oData.relative_path : '../..',
		aBrowsers =  oData.scss.browsers !== undefined ? oData.scss.browsers : ["last 1 version"] ;

	return {
		options: {
			processors: [
				require('autoprefixer')({ browsers: aBrowsers }),
				require('cssnext')(),
				require('precss')()
			]
		},
		dist: {
			src: sRelativePath + '/' + oData.scss.dest + '/*.css'
		}
	}
}
