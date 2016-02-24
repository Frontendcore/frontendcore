module.exports = function( grunt ) {

	require(grunt.option('appCwd') + "/grunt/_tools.js")(grunt);

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		scssCwd = grunt.option('appCwd') + '/',
		scssSrc = '*.scss',
		scssDest,
		oFiles;


	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	scssDest = grunt.option('scssDest') !== undefined ? getRelativePath(grunt.option('scssDest'), 'appCwd') : getRelativePath(oData.scss.dest, 'appCwd');

	var aPaths = [];

	if ( grunt.option('scssCwd') !== undefined ) {

		// GET SRC PATH & FILE FOR JUST ONE FILE

		scssCwd += grunt.option('scssCwd');

		var aTemp = grunt.option('scssCwd').split('/');

		for ( var nKey = 0; nKey < (aTemp.length); nKey++ ) {

			if (nKey === aTemp.length -1) {
				scssSrc = aTemp[nKey];
			}

		}

		oFiles = {};

		if ( scssDest.indexOf('.css') !== -1 ) {
			oFiles[scssDest] = scssCwd;
		} else {
			oFiles[scssDest + scssSrc.replace('.scss','.css')] = scssCwd;
		}

	} else {

		// GET SRC PATH & FILE FOR ALL FILES

		if ( Object.prototype.toString.call( oData.scss.cwd ) === '[object Array]' ) {
			for ( var nKey = 0; nKey < oData.scss.cwd.length; nKey++ ) {
				aPaths.push( grunt.option('appCwd') + '/' +  oData.scss.cwd[nKey] );
			}
		} else {
			aPaths.push( grunt.option('appCwd') + '/' +  oData.scss.cwd );
		}

		scssCwd = aPaths[0];

		oFiles = [{
			expand: true,
			cwd: scssCwd,
			src: [scssSrc],
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