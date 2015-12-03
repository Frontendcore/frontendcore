module.exports = {
	common: {
		files: [{
			expand: true,
			cwd: 'scss/',
			src: ['*.scss'],
			dest: 'build/static/css',
			ext: '.css'
		}],
		options: {
			sourceMap: false,
			outputStyle: 'compressed'
		}
	}
}
