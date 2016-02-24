module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var aBrowsers = oData !== null &&  oData.scss.browsers !== undefined ? oData.scss.browsers : ["last 1 version"],
		sTarget = getRelativePath( scssDest,'appCwd');

	if ( grunt.option('scssDest') === undefined ) {
		sTarget += '/*.css';
	} else if ( grunt.option('scssDest') !== undefined &&  grunt.option('scssDest') !== scssDest ) {
		sTarget = grunt.option('scssDest');
	}

	return {
		options: {
			processors: [
				require(fcCwd+ '/node_modules/cssnext/dist/index')({browsers: aBrowsers}),
				require(fcCwd+ '/node_modules/precss/index')()
			]
		},
		dist: {
			src: sTarget
		}
	}
}
