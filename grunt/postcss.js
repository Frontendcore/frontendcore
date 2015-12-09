module.exports = {
	options: {
		processors: [
			require('autoprefixer')({browsers: ['last 1 version']}),
			require('cssnext')(),
			require('precss')()
		]
	},
	dist: {
		src: 'build/static/css/*.css'
	}
}
