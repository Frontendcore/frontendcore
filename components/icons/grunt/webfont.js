module.exports = function(grunt) {

	var sCustomPath = grunt.option( "path" ) == undefined ? '/src/none' : grunt.option( "path" );

	return {
		myIcons: {
			src: ['src/icons/*.svg'],
			dest: "dist/",
			options: {
				fontHeight: 1792,
				stylesheet: 'scss',
				engine: 'node',
				syntax: 'bem',
				embed: true,
				types: 'woff',
				templateOptions: {
					baseClass: 'icon',
					classPrefix: 'icon--',
					mixinPrefix: 'icon-'
				}
			}
		}
	}
}