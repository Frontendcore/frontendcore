module.exports = function(grunt) {

	var oData = require('../../../frontendcore.json'),
		sRelativePath = oData.relative_path ? oData.relative_path : '../..';


	return {
		options: {
			globals: {
				console: true
			}
		},
		files: ['src/js/**/*.js']

	}

}