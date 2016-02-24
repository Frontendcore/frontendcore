module.exports = function( grunt ) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var oFiles = {},
		aPaths = [];

	if ( scssCwdFile !== '*.scss' ) {

		// GET SRC PATH & FILE FOR JUST ONE FILE
		oFiles[scssDest + scssDestFile] = scssCwd + scssCwdFile;

	} else if ( oData !== null ) {

		// GET SRC PATH & FILE FOR ALL FILES

		if ( Object.prototype.toString.call( scssCwd ) === '[object Array]' ) {
			for ( var nKey = 0; nKey < scssCwd.length; nKey++ ) {
				aPaths.push( getRelativePath(scssCwd[nKey]) );
			}
		} else {
			aPaths.push( scssCwd );
		}

		oFiles = [{
			expand: true,
			cwd: aPaths[0],
			src: [scssCwdFile],
			dest: scssDest,
			ext: '.css'
		}]
	}

	return  {
		scss: {
			files: oFiles,
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			}
		}
	}
}