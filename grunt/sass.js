module.exports = function( grunt ) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		scssCwd = '',
		scssSrc = '*.scss',
		scssDest;

	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	// GET SRC PATH & FILE FOR JUST ONE FILE

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
		scssCwd = oData.scss.cwd;
	}

	scssDest = grunt.option('scssDest') !== undefined ? grunt.option('scssDest') : oData.scss.dest;

	return  {
		scss: {
			files: [{
				expand: true,
				cwd: grunt.option('appCwd') + '/' + scssCwd + '/',
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