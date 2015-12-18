module.exports = {
	Polyfills: {
		files: [
			{
				cwd: 'libs/normalize-css/',
				expand: true,
				flatten: true,
				src: 'normalize.css',
				dest: 'dist/scss/normalize/',
				rename: function(dest, src) {
					return dest + '_' + src.replace(/\.css$/, ".scss");
				}
			}
		]
	},
}
