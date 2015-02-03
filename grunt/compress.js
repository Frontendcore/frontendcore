module.exports = {
	scss: {
		options: {
			archive: '../site/build/downloads/frontendCoreScss.zip'
		},
		files: [
			{expand: true, cwd: 'css/core/', src: ['**']}
		]
	},
	css: {
		options: {
			archive: '../site/build/downloads/frontendCoreCss.zip'
		},
		files: [
			{ expand: true, cwd: '../site/build/static/css', src: ['frontendcore.css','ie-old.css','ie-new.css'] }
		]
	},
	full: {
		options: {
			archive: '../site/build/downloads/frontendCoreFull.zip'
		},
		files: [
			{expand: true, cwd: 'css/core/', src: ['**'], dest: 'frontendcore-scss'},
			{expand: true, cwd: '../site/build/static/js', src: ['**'], dest: 'frontendcore-js'},
		]
	}
};