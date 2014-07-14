/*global module:false*/
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			dist: {
				options: {
					config: 'css/config.rb'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'build/static/css/ui/modal.css': [
						'bower_components/jquery-colorbox/example5/colorbox.css'
					],
					'build/static/css/ui/code.css': [
						'js/libs/highlightjs/styles/github.css'
					],
					'build/static/css/ui/autocomplete.css': [
						'bower_components/Autocompleter/jquery.autocompleter.css'
					],
					'build/static/css/ui/tags.css': [
						'js/libs/jquery-autosuggest/autoSuggest.css'
					],
					'build/static/css/ui/stats.css': [
						'js/libs/jquery-visualize/css/visualize.css',
						'js/libs/jquery-visualize/css/visualize-light.css'
					],
					'build/static/css/ui/sidemenu.css': [
						'bower_components/sidr/dist/stylesheets/jquery.sidr.dark.css'
					],
					'build/static/css/ui/wysiwyg.css': [
						'bower_components/tinymce/skins/lightgray/skin.min.css'
					],
					'build/static/css/ui/tip.css': [
						'bower_components/opentip/css/opentip.css'
					]
				}
			}
		},
		uglify: {
			options: {
				beautify: false
			},
			core: {
				files: {
					'build/static/js/ui.js': [
						'js/base/_tools.js',
						'js/base/_responsive-images.js',
						'js/ui/code.js',
						'js/ui/sortable.js',
						'js/ui/tags.js',
						'js/ui/truncate.js',
						'js/ui/tabs.js',
						'js/ui/autocomplete.js',
						'js/ui/autosize.js',
						'js/ui/modals.js',
						'js/ui/wysiwyg.js',
						'js/ui/graphs.js',
						'js/ui/stats.js',
						'js/ui/polyfills.js',
						'js/ui/toggle.js',
						'js/ui/tip.js',
						'js/ui/sidemenu.js',
						'js/ui/cart.js',
						'js/ui/parallax.js'
					],
					'build/static/js/core.js': [
						'bower_components/tinycorejs/build/TinyCore.js',
						'bower_components/tinycorejs/build/tools/mediator/TinyCore.Toolbox.Mediator.min.js',
						'bower_components/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
						'bower_components/tinycorejs/build/extensions/AMD/TinyCore.AMD+domBoot.min.js',
						'js/base/_device-detection.js',
						'js/base/_modules-config.js',
						'js/base/_dom-ready.js',
						'js/base/_query-selector.js',
						'build/static/js/ui.js',
						'js/base/_init.js'
					],
					'build/static/js/devices/desktop.js': [
						'bower_components/jquery/dist/jquery.js',
						'js/libs/modernizr/modernizr-custom.js',
						'bower_components/jquery-unveil/jquery.unveil.js'
					],
					'build/static/js/ui/stats.js': [
						'js/libs/jquery-visualize/js/excanvas.js',
						'js/libs/jquery-visualize/js/visualize.jQuery.js'
					],
					'build/static/js/ui/modal.js': [
						'bower_components/jquery-colorbox/jquery.colorbox.js'
					],
					'build/static/js/ui/tags.js': [
						'js/libs/jquery-autosuggest/jquery.autoSuggest.js'
					],
					'build/static/js/ui/parallax.js': [
						'js/libs/skrollr/skrollr.js'
					],
					'build/static/js/ui/autocomplete.js': [
						'bower_components/Autocompleter/jquery.autocompleter.js'
					],
					'build/static/js/ui/sortable.js': [
						'js/libs/jquery-serialize/jquery.serializetree.js',
						'bower_components/jquery.sortable/index.js'
					],
					'build/static/js/ui/serialize.js': [
						'js/libs/jquery-serialize/jquery.serializetree.js',
						'js/ui/serialize.js'
					],
					'build/static/js/ui/code.js': [
						'js/libs/highlightjs/highlight.pack.js'
					],
					'build/static/js/ui/truncate.js': [
						'bower_components/jquery.truncator.js/jquery.truncator.js'
					],
					'build/static/js/ui/polyfills.js': [
						'js/libs/modernizr/modernizr-custom.js',
						'js/libs/webshims/polyfiller.js'
					],
					'build/static/js/ui/sidemenu.js': [
						'bower_components/sidr/dist/jquery.sidr.js'
					],
					'build/static/js/ui/autosize.js': [
						'bower_components/jquery-autosize/jquery.autosize.js'
					],
					'build/static/js/ui/tip.js': [
						'bower_components/opentip/downloads/opentip-jquery.js'
					],
					'build/static/js/ui/cart.js': [
						'bower_components/simplecart-js/simpleCart.js'
					],
					'build/static/js/ie-old.js': [
						'js/libs/ie-polyfills/queryselector.js',
						'js/libs/ie-polyfills/html5shiv.js',
						'js/libs/ie-polyfills/ecmascript5.js'
					]
				}
			},
			tests: {
				files: [{
					expand: true,
					src: 'tests/**/*.js',
					dest: 'build/tests',
					cwd: './'
				}]
			}
		},
		jshint: {
			options: {
				globals: {
					console: true
				}
			},
			dist: ['Gruntfile.js', 'js/core/**/*.js', 'js/ui/**/*.js']

		},
		jasmine: {
			main:{
				src: 'build/**/*.js',
				options: {
					specs: 'js/test/**/*.js',
					outfile: 'build/js-tests.html'
				}
			}
		},
		stencil: {
			main: {
				options: {
					partials: 'docs/partials',
					templates: 'docs/templates'
				},
				files: [
					{
						expand: true,
						cwd: 'docs/pages/',
						src: '**/*.*',
						dest: 'build',
						ext: '.html',
						flatten: false
					}
				]
			}
		},
		zip: {
			'FrontendCore-js': {
				cwd: 'build/static/js',
				src: ['build/static/js/*/**','build/static/js/*'],
				dest: 'build/downloads/FrontendCore-js.zip'
			},
			'FrontendCore-scss': {
				cwd: 'css',
				src: ['css/*/**','css/*'],
				dest: 'build/downloads/FrontendCore-scss.zip'
			},
			'FrontendCore-css': {
				cwd: 'build/static/css',
				src: ['build/static/css/**/*','build/static/css/*'],
				dest: 'build/downloads/FrontendCore-css.zip'
			}
		},
		watch: {
			scripts: {
				files: ['js/core/**/*.js', 'js/ui/**/*.js', 'js/libs/**/*.js', 'Gruntfile.js'],
				tasks: ['javascript']
			},
			tests: {
				files: ['tests/**/*.js'],
				tasks: ['tests']
			},
			docs: {
				files: ['docs/**/*.html','docs/**/*.md'],
				tasks: ['html']
			},
			scss: {
				files: ['css/**/*.scss'],
				tasks: ['scss']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-stencil');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-zip');

	grunt.registerTask('javascript', ['uglify:core', 'jshint']);
	grunt.registerTask('tests', ['uglify:tests']);
	grunt.registerTask('scss', ['compass', 'cssmin']);
	grunt.registerTask('html', ['stencil']);

	grunt.registerTask('default', ['stencil', 'compass', 'cssmin', 'uglify', 'jshint']);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};