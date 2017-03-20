module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var aPaths = [],
		sPathDest = '/',
        sPathDestScss = grunt.option('fcCwd') + '/components/icons/scss/',
		bHtmlDemo = true,
		sPathTemplate = grunt.option('fcCwd') + '/components/icons/template/icons.tpl.css',
		sPathTemplatePlaceholder = grunt.option('fcCwd') + '/components/icons/template/icons-placeholders.tpl.scss',
		sPathDemoTemplate = grunt.option('fcCwd') + '/components/icons/template/icons.html',
		sDestHtml = '';


    if (oData !== null ) {

		if (oData.icons !== undefined) {
			if (oData.icons.cwd !== undefined) {
				aPaths.push(grunt.option('appCwd') + '/' + oData.icons.cwd + '/*.svg');
			}

			if (oData.icons.default !== false || !oData.icons.hasOwnProperty('default')) {
				aPaths.push(grunt.option('fcCwd') + '/components/icons/font-awesome/*.svg');
			}

			if (oData.icons.dest !== false) {
				sPathDest = grunt.option('appCwd') + '/' + oData.icons.dest;
			}

			if (oData.icons.destScss !== undefined) {
                sPathDestScss = grunt.option('appCwd') + '/' + oData.icons.destScss;
			}

			if (oData.icons.destHtml !== undefined) {
				sDestHtml = grunt.option('appCwd') + '/' + oData.icons.destHtml;
			} else {
				sDestHtml = sPathDest;
				bHtmlDemo = false;
			}

		}

		return {
            placeHolders: {
                src: aPaths,
                dest: sPathDestScss,
                options: {
                    fontHeight: 1792,
                    stylesheet: 'scss',
                    destHtml: sDestHtml,
                    htmlDemo: false,
                    engine: 'node',
                    styles: 'icon',
                    syntax: 'bootstrap',
                    embed: true,
                    types: 'woff',
                    template: sPathTemplatePlaceholder,
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon-',
                        mixinPrefix: 'icon-'
                    }
                }
            },
			myIcons: {
				src: aPaths,
				dest: sPathDest,
				options: {
					fontHeight: 1792,
					stylesheet: 'css',
					destHtml: sDestHtml,
					htmlDemo: bHtmlDemo,
					engine: 'node',
					styles: 'font,icon,extra',
					syntax: 'bootstrap',
					embed: true,
					types: 'woff',
					template: sPathTemplate,
					htmlDemoTemplate: sPathDemoTemplate,
					templateOptions: {
						baseClass: 'icon',
						classPrefix: 'icon-',
						mixinPrefix: 'icon-'
					}
				}
			}
		}
	}
}