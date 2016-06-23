module.exports = function(grunt) {

	require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

	var jsCwd = appCwd + '/',
		jsSrc = '**/*.js',
		oJsSrc = [],
		jsModulesFolder,
		oConfig = {
			Polyfills: {
				files: [
					{
						cwd: fcCwd +'/_resources/polyfills/',
						expand: true,
						flatten: false,
						src: ['**/*.*'],
						dest: fcCwd +'/build/static/js/shims'
					}
				]
			},
			static: {
				files: [
					{
						cwd: fcCwd +'/_resources/static/',
						expand: true,
						flatten: false,
						src: ['**/*.*'],
						dest: fcCwd +'/build/static/'
					}
				]
			}
		};

	if ( oData !== null ) {


		if ( oData.js !== undefined) {

			if (oData.js.cwd !== undefined && !Object.prototype.toString.call(oData.js.cwd) === '[object Array]') {
				jsCwd += oData.js.cwd + '/';
			}

			jsModulesFolder =  grunt.option('appCwd') +'/'+ oData.js.dest +'/';

			if (  oData.js.modulesFolder !== undefined ) {
				jsModulesFolder += oData.js.modulesFolder + '/';
			} else {
				jsModulesFolder += 'modules/';
			}

			if ( Object.prototype.toString.call(oData.js.cwd) === '[object Array]') {
				for (var nKey = 0; nKey < oData.js.cwd.length; nKey++) {
					oJsSrc.push(oData.js.cwd[nKey] +'/'+ jsSrc);
					oJsSrc.push('!' + oData.js.cwd[nKey] +'/_'+ jsSrc);
				}
			} else {
				oJsSrc = [jsSrc];
			}
			
			oConfig['js'] = {
				files: [
					{
						cwd: jsCwd,
						expand: true,
						flatten: true,
						src: oJsSrc,
						dest:jsModulesFolder
					}
				]
			};

		}


		oConfig['jsForms'] = {
			files: [
				// makes all src relative to cwd
				{
					expand: true,
					cwd: fcCwd + '/bower/parsleyjs/src/i18n/',
					src: ['**'],
					dest: jsDest + '/ui/forms-locale/'
				},
			]
		}

		oConfig['img'] = {
			files: [{
				cwd: fcCwd +'components/',
				expand: true,
				flatten: true,
				src: ['**/img/*.*'],
				dest: scssDest +'/img/'
			}]
		};

	}

	return oConfig;

}