module.exports =  {
	workspace: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'static/', src: ['**'], dest: 'build/static/'},
		]
	},
	scss: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'css/core/', src: ['**'], dest: './../scss/'},
		]
	},
	js: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'build/static/js/', src: ['**'], dest: './../js/'},
		]
	}
};