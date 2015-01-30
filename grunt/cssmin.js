module.exports = {
	target: {
		files: [{
			expand: true,
			cwd: './../site/build/build/static/css',
			src: ['*.css', '!*.min.css'],
			dest: './../site/build/build/static/css',
			ext: '.css'
		}]
	}
};