module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var aBrowsers = oData !== null && oData.scss !== undefined && oData.scss.browsers !== undefined ? oData.scss.browsers : ["last 1 version"],
		sTarget = getRelativePath( scssDest,'appCwd');

	if ( grunt.option('scssDest') === undefined ) {
		sTarget += '/*.css';
	} else if ( grunt.option('scssDest') !== undefined &&  grunt.option('scssDest') !== scssDest ) {
		sTarget = grunt.option('scssDest');
	}

	return {
		options: {
			processors: [
				require('postcss-cssnext')({browsers: aBrowsers}),
			]
		},
		dist: {
			src: sTarget
		}
	}
}
