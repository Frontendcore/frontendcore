module.exports = {
	target: {
		files: [{
			expand: true,
			cwd: 'build/static/css',
			src: ['*.css', '!*.min.css'],
			dest: 'build/static/css',
			ext: '.css'
		}]
	}
};