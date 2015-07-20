module.exports = {
	dist: {
		src: 'css/core/',
		options: {
			dest: './../site/build/sassdoc/',
			verbose: false,
			display: {
				access: ['public'],
				alias: false,
				watermark: false
			},
			package: './package.json',
			basePath: 'http://www.frontendcore.com'
		}
	}
};
