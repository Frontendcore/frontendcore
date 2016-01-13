module.exports = function(grunt) {

	var oData = require(grunt.option('appCwd') + '/frontendcore.json'),
		aPaths = [],
		sPathDest = '/',
		bHtmlDemo = true,
		sDestHtml = '';

	if ( oData.icons !== undefined) {
		if ( oData.icons.cwd !== undefined) {
			aPaths.push( grunt.option('appCwd') + '/' + oData.icons.cwd + '/*.svg' );
		}

		if ( oData.icons.default !== false) {
			aPaths.push( grunt.option('fcCwd') + '/components/icons/font-awesome/*.svg'  );
		}

		if ( oData.icons.dest !== false) {
			sPathDest = grunt.option('appCwd') + '/' + oData.icons.dest;
		}

		if ( oData.icons.destHtml !== undefined ) {
			sPathDest = grunt.option('appCwd') + '/' + oData.icons.destHtml;
		} else {
			sDestHtml = sPathDest;
			bHtmlDemo = false;
		}

	}

	return {
		myIcons: {
			src: aPaths,
			dest: sPathDest,
			options: {
				fontHeight: 1792,
				stylesheet: 'css',
				destHtml: sDestHtml,
				htmlDemo : bHtmlDemo,
				engine: 'node',
				styles: 'font,icon,extra',
				syntax: 'bootstrap',
				embed: true,
				types: 'woff',
				templateOptions: {
					baseClass: 'icon',
					classPrefix: 'icon-',
					mixinPrefix: 'icon-'
				}
			}
		}
	}
}