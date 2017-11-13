module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var aPaths = [],
		sPathDest = '/',
		nFontheight = 1792,
        sPathDestScss = grunt.option('fcCwd') + '/components/icons/scss/',
		bHtmlDemo = true,
		sPathTemplate = grunt.option('fcCwd') + '/components/icons/template/icons.css',
		sPathTemplateIconsOnly = grunt.option('fcCwd') + '/components/icons/template/icons-only.css',
		sPathTemplateWithoutPlaceholder = grunt.option('fcCwd') + '/components/icons/template/_icons-without-placeholders.scss',
		sPathTemplatePlaceholder = grunt.option('fcCwd') + '/components/icons/template/_icons-placeholders.scss',
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
				sPathDest = appCwd + '/' + oData.icons.dest;
			}

			if (oData.icons.destScss !== undefined) {
                sPathDestScss = appCwd + '/' + oData.icons.destScss;
			}

			if (oData.icons.height !== undefined) {
                nFontheight = oData.icons.height;
			}

			if (oData.icons.destHtml !== undefined) {
				sDestHtml = grunt.option('appCwd') + '/' + oData.icons.destHtml;
			} else {
				sDestHtml = sPathDest;
				bHtmlDemo = false;
			}

		}

		console.log(sPathDest);

		return {
			myIcons: {
				src: aPaths,
				dest: sPathDest,
				options: {
                    customOutputs: [{
                        template: sPathTemplate,
                        dest: sPathDest,
                        stylesheet: 'css'
                    }, {
                        template: sPathTemplatePlaceholder,
                        dest: sPathDest,
                        stylesheet: 'css'
                    }, {
                        template: sPathTemplateIconsOnly,
                        dest: sPathDestScss,
                        stylesheet: 'scss'
                    }, {
                        template: sPathTemplateWithoutPlaceholder,
                        dest: sPathDestScss,
                        stylesheet: 'scss'
                    }],
					fontHeight: nFontheight,
					destHtml: sDestHtml,
					htmlDemo: bHtmlDemo,
					engine: 'node',
					styles: 'font,icon,extra',
					syntax: 'bootstrap',
					embed: true,
					types: 'woff',
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