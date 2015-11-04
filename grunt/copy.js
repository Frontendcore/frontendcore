module.exports =  {

	workspace: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'static/', src: ['**'], dest: './../site/build/static/'},
			{expand: true, cwd: './bower_components/webshim/js-webshim/minified/', src: ['**'], dest: './../site/build/static/js/shims/'},
			{expand: true, cwd: './bower_components/object-fit-polyfill/src/', src: ['**'], dest: './../site/build/static/js/shims/'}
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
			{expand: true, cwd: 'bower_components/parsleyjs/src/i18n/', src: ['**'], dest: './../site/build/static/js/ui/forms-locale/'},
			{expand: true, cwd: './../site/build/static/js/', src: ['**'], dest: './../js/'},
		]
	},
	generator: {
		files: [
			// makes all src relative to cwd
			{expand: true, cwd: 'css/core/skins/default', src: ['**'], dest: './../generator/app/templates/css/_config'}
		]
	}
};
