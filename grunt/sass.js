module.exports = function( grunt ) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		scssCwd = grunt.option('appCwd') + '/',
		scssSrc = '*.scss',
		scssDest;

	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	// GET SRC PATH & FILE FOR JUST ONE FILE

	var aPaths = [];

	if ( grunt.option('scssCwd') !== undefined ) {

		var aTemp = grunt.option('scssCwd').split('/');

		for ( var nKey = 0; nKey < (aTemp.length); nKey++ ) {

			if (nKey !== aTemp.length -1) {
				scssCwd += aTemp[nKey] + '/';
			} else {
				scssSrc = aTemp[nKey];
			}

		}
	} else {

		if ( Object.prototype.toString.call( oData.scss.cwd ) === '[object Array]' ) {
			for ( var nKey = 0; nKey < oData.scss.cwd.length; nKey++ ) {
				aPaths.push( grunt.option('appCwd') + '/' +  oData.scss.cwd[nKey] );
			}
		} else {
			aPaths.push( grunt.option('appCwd') + '/' +  oData.scss.cwd );
		}

		scssCwd = aPaths[0];
	}

	scssDest = grunt.option('scssDest') !== undefined ? grunt.option('scssDest') : oData.scss.dest;

	return  {
		scss: {
			files: [{
				expand: true,
				cwd: scssCwd,
				src: [scssSrc],
				dest: grunt.option('appCwd') + '/' + scssDest + '/',
				ext: '.css'
			}],
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			}
		}
	}
}