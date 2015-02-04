module.exports =  {
	workspace: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'static/', src: ['**'], dest: './../site/build/static/'}
		]
	},
	scss: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'css/core/', src: ['**'], dest: './../scss/'}
		]
	},
	js: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: './../site/build/static/js/', src: ['**'], dest: './../js/'}
		]
	},
	generator: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'css/core/skins/default', src: ['**'], dest: './../generator/app/templates/css/_config'}
		]
	}
};