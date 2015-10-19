module.exports = {
	app: {
		// Takes every file that ends with .scss from the scss
		// directory and compile them into the css directory.
		// Also changes the extension from .scss into .css.
		// Note: file name that begins with _ are ignored automatically
		files: [{
			expand: true,
			cwd: 'css',
			src: ['*.scss'],
			dest: '../site/build/static/css/',
			ext: '.css'
		}]
	},
	options: {
		sourceMap: true,
		outputStyle: 'expanded',
		imagePath: "../",
	}
};
