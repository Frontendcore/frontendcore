module.exports = {
	dist: {
		src: 'css/core/',
			dest: 'build/sassdoc/',
			options: {
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