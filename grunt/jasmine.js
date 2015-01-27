module.exports = {
	src: [
		'build/static/js/ui/*.js'
	],
	options: {
		specs: 'build/static/js/test/*.test.js',
		vendor: [
			'js/base/_oGlobalSettings.js',
			'build/static/js/core.js',
			'build/static/js/devices/desktop.js',
			'build/static/js/ui/*.js'
		],
		outfile: 'build/data/tests.html',
		keepRunner: true
	}
};