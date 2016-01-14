module.exports = function( grunt ) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json');

	if ( grunt.option('project') ) {
		oData = oData[grunt.option('project')];
	}

	return  {
		common: {
			files: [{
				expand: true,
				cwd: grunt.option('appCwd') + '/' + oData.scss.cwd + '/',
				src: ['*.scss'],
				dest: grunt.option('appCwd') + '/' + oData.scss.dest + '/',
				ext: '.css'
			}],
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			}
		}
	}
}