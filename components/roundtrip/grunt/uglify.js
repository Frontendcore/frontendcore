module.exports = function(grunt) {

	var oData = require('../../../frontendcore.json'),
		sRelativePath = oData.relative_path ? oData.relative_path : '../..';


	return {
		rountrip: {
			options: {
				preserveComments: false,
				beautify: true
			},
			files: {
				'dist/js/roundtrip.js' : [
					'libs/twig.js/twig.js',
					'src/js/roundtrip.js'
				]
			}
		}

	}

}