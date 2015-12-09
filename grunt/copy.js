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
	},
	static: {
		files: [
			{
				cwd: '_resources/static/',
				expand: true,
				flatten: false,
				src: ['**/*.*'],
				dest: 'build/static/'
			}
		]
	},
}
