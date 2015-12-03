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
	jsCore: {
		files: [
			{
				cwd: 'components/**/dist/js',
				expand: true,
				flatten: false,
				src: ['*.*'],
				dest: 'build/static/js/'
			}
		]
	},
}
