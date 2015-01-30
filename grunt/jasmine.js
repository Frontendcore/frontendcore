module.exports = {
	src: [
		'./../site/build/static/js/ui/*.js'
	],
	options: {
		specs: './../site/build/static/js/test/*.test.js',
		vendor: [
			'js/base/_oGlobalSettings.js',
			'./../site/build/static/js/core.js',
			'./../site/build/static/js/devices/desktop.js',
			'./../site/build/static/js/ui/*.js'
		],
		outfile: './../site/build/data/tests.html',
		keepRunner: true
	}
};