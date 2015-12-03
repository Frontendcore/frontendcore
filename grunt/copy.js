module.exports = {
	Polyfills: {
		files: [
			{
				cwd: '_resources/polyfills/',
				expand: true,
				flatten: false,
				src: ['**/*.*'],
				dest: 'build/static/js/shims'
			}
		]
	}
}
