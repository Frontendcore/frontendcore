module.exports = function( grunt ) {

	var oData = require(grunt.option('pathJSON') + '/frontendcore.json'),
		sRelativePath = oData.relative_path ? oData.relative_path : '.';

	return  {
		common: {
			files: [{
				expand: true,
				cwd: sRelativePath + '/' + oData.scss.cwd + '/',
				src: ['*.scss'],
				dest: sRelativePath + '/' + oData.scss.dest + '/',
				ext: '.css'
			}],
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			}
		}
	}
}